import Express from 'express'
import BodyParser from 'body-parser'
import Compression from 'compression'
import CORS from 'express-cors'
import Email from 'emailjs'
import {
  DoctorModel,
  HospitalModel,
  PharmacyModel
} from './models'

const CREDENTIALS = require('./credentials/gmail-account.json')
const Router = Express.Router()
let App = Express()

App.use(Compression())
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({'extended': false}))
App.use(CORS({
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://clearview.mfisupport.com'
  ]
}))

Router.route('/doctors')
  .get(function (req, res) {
    DoctorModel.find({}, function (err, data) {
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
    }, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Server Error when querying doctors collection.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/hospitals')
  .get(function (req, res) {
    HospitalModel.find({}, function (err, data) {
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
        {Name: {$regex: searchString, $options: 'i'}},
        {City: {$regex: searchString, $options: 'i'}}
      ]
    }, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Server Error when querying hospitals collection.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/pharmacies')
  .get(function (req, res) {
    PharmacyModel.find({}, function (err, data) {
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
    }, function (err, data) {
      const response = (err)
        ? {error: true, message: 'Server Error when querying pharmacies collection.'}
        : {error: false, message: data}
      res.json(response)
    })
  })

Router.route('/sendmail/:message')
  .post(function (req, res) {
    const Server = Email.server.connect({
      user: CREDENTIALS.login,
      password: CREDENTIALS.pass,
      host: 'smtp.gmail.com',
      ssl: true
    })
    const email = JSON.parse(decodeURIComponent(req.params.message))
    Server.send(email, function (err, message) {
      const response = (err)
        ? {error: true, message: 'Error. Please try again later.'}
        : {error: false, message: message.text}
      res.json(response)
    })
  })

Router.route('/loaderio-fd1cdacd3eabdbda6e8ed5433186881d')
  .get(function (req, res) {
    res.send('loaderio-fd1cdacd3eabdbda6e8ed5433186881d')
  })

App.use('/', Router)
App.listen(3000)
