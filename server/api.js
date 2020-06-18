import Express from 'express'
import BodyParser from 'body-parser'
import Compression from 'compression'
import CORS from 'express-cors'
import { google } from 'googleapis'
import path from 'path';
import {
  DoctorModel,
  HospitalModel,
  PharmacyModel
} from './models'

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const KEYFILE = require('./credentials/google-service-account-key.json');

const jwtClient = new google.auth.JWT(
  keyfile.client_email,
  keyfile,
  keyfile.private_key,
  SCOPES,
  'clearviewcancerinstitute@gmail.com'
);

const gmail = google.gmail({
  version: 'v1',
  auth: jwtClient
});

async function sendMail(email) {
  email.to = (email.subject === 'Appointment Request via Directory App')
      ? 'CCI <CCINewPatientScheduler@ccihsv.com>'
      : 'Leigh Ann Lackey <llackey@ccihsv.com>';

  const messageParts = [
    email.from,
    email.to,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    email.subject,
    '',
    email.text
  ];

  const message = messageParts.join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage
    }
  });

  console.log('Sent email');
  return res.data;
}

const Router = Express.Router()
let App = Express()

App.use(Compression())
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({'extended': false}))
App.use(CORS({
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:4000',
    '*'
  ]
}))

App.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

Router.route('/doctors')
  .get(function (req, res) {
    DoctorModel.find({}, null, { sort: { LastName: 1, FirstName: 1 } }, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Error Loading Doctors.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/doctors/search/:searchString')
  .get(function (req, res) {
    const searchString = decodeURIComponent(req.params.searchString)
    DoctorModel.find({
      $or: [
        {FullName: {$regex: searchString, $options: 'i'}},
        {Specialty: {$regex: searchString, $options: 'i'}},
        {PracticeName: {$regex: searchString, $options: 'i'}}
      ]
    }, null, { sort: { LastName: 1, FirstName: 1 } }, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Server Error when querying doctors collection.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/hospitals')
  .get(function (req, res) {
    HospitalModel.find({}, null, { sort: { Name: 1 } }, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Error Loading Hospitals.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/hospitals/search/:searchString')
    .get(function (req, res) {
      const searchString = decodeURIComponent(req.params.searchString)
      HospitalModel.find({
        $or: [
          { Name: { $regex: searchString, $options: 'i' } },
          { City: { $regex: searchString, $options: 'i' } }
        ]
      }, null, { sort: { Name: 1 } }, function (err, data) {
        const response = (err)
          ? { error: true, message: 'Server Error when querying hospitals collection.' }
          : { error: false, message: data }
        res.json(response)
      })
    })

Router.route('/pharmacies')
  .get(function (req, res) {
    PharmacyModel.find({}, null, {sort: { Name: 1 }}, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Error Loading Pharmacies.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/pharmacies/search/:searchString')
  .get(function (req, res) {
    const searchString = decodeURIComponent(req.params.searchString)
    PharmacyModel.find({
      $or: [
        {Name: {$regex: searchString, $options: 'i'}},
        {City: {$regex: searchString, $options: 'i'}}
      ]
    }, null, { sort: { Name: 1 } }, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Server Error when querying pharmacies collection.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/sendmail/:message')
  .post(function (req, res) {
    let email = JSON.parse(decodeURIComponent(req.params.message));

    sendMail(email).then(function () {
      res.json({error: false, message: 'Success'});
    }).catch(function (err) {
      console.error(err);
      res.json({error: true, message: 'Error. Please try again later.'});
    });
  });

App.use('/', Router)
App.listen(3000)
