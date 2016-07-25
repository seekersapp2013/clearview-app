import async from 'async'
import jsonfile from 'jsonfile'
import GoogleSpreadsheet from 'google-spreadsheet'
import path from 'path'

const PRIVATE_KEY = require('../credentials/google-service-account-key.json')
const SPREADSHEET_ID = '1kZQbsrzJqKgtie-a5cXGWdO5_c7pjEYrMkw_OizUyac'
const JSON_FILE_LOCATIONS = {
  'doctors': path.resolve(__dirname, '..', 'data/', 'doctors.json'),
  'pharmacies': path.resolve(__dirname, '..', 'data/', 'pharmacies.json'),
  'hospitals': path.resolve(__dirname, '..', 'data/', 'hospitals.json')
}

let doc = new GoogleSpreadsheet(SPREADSHEET_ID)
async.series([
  function setAuth (step) {
    doc.useServiceAccountAuth(PRIVATE_KEY, step)
  },

  function checkIfUpdateIsNeeded (step) {
    const DATE = new Date()
    doc.getInfo(function (err, info) {
      if (err) console.log(err)
      const msPerDay = 86400000
      const lastUpdated = new Date(info.updated)

      let msSinceLastUpdate = DATE - lastUpdated
      let daysSinceUpdate = msSinceLastUpdate / msPerDay
      let daysRounded = parseFloat(Math.round(daysSinceUpdate * 100) / 100).toFixed(2)

      console.log(daysRounded + ' days since last update was made in spreadsheet.')
      step()
    })
  },

  function getInfoAndWorksheets (step) {
    Promise.all(doc.getInfo(function (err, info) {
      if (err) console.log(err)
      const worksheets = info.worksheets

      worksheets.map(function (items) {
        switch (items.title) {
          case 'doctors':
            extractDoctorsFromSpreadsheet(items)
            break
          case 'pharmacies':
            extractPharmaciesFromSpreadsheet(items)
            break
          case 'hospitals':
            extractHospitalsFromSpreadsheet(items)
            break
          default:
            handleOtherRows(items)
        }
      })
    })).then(function () {
      step()
    })
  }
])

function handleOtherRows (worksheet) {
  return false
}

function extractDoctorsFromSpreadsheet (worksheet) {
  var doctors = []
  worksheet.getRows({}, function (err, rows) {
    if (err) console.log(err)
    Promise.all(rows.map(function (row) {
      if ((typeof row !== 'undefined') && (typeof row.firstname !== 'undefined')) {
        doctors.push({
          'LastName': row.lastname,
          'FirstName': row.firstname,
          'FullName': row.firstname + ' ' + row.lastname,
          'PhoneNumber': row.phonenumber,
          'FaxNumber': row.faxnumber,
          'PracticeName': row.practicename,
          'Specialty': row.specialty,
          'Address': row.address,
          'City': row.city,
          'State': row.state,
          'Zip': row.zip,
          'County': row.county
        })
      }
    })).then(writeToFile('doctors', doctors))
  })
}

function extractHospitalsFromSpreadsheet (worksheet) {
  var hospitals = []
  Promise.all(worksheet.getRows({}, function (err, rows) {
    if (err) console.log(err)
    rows.map(function (row) {
      if ((typeof row !== 'undefined') && (typeof row.name !== 'undefined')) {
        hospitals.push({
          'Name': row.name,
          'Address': row.address,
          'City': row.city,
          'State': row.state,
          'Zip': row.zip,
          'County': row.county,
          'PhoneNumber': row.phonenumber,
          'DirectoryID': row.directoryid,
          'Directory': {}
        })
      }
    })
  })).then(extractDirectoriesFromSpreadSheet(hospitals))
}

function extractDirectoriesFromSpreadSheet (hospitals) {
  var directories = []
  doc.getInfo(function (err, info) {
    if (err) console.log(err)
    const worksheets = info.worksheets
    worksheets.map(function (sheet) {
      if (sheet.title && sheet.title.indexOf('-directory') > -1) {
        directories[sheet.title] = []
        sheet.getRows({}, function (err, rows) {
          if (err) console.log(err)
          Promise.all(rows.map(function (row) {
            directories[sheet.title].push({
              'Name': row.name,
              'PhoneNumber': row.phonenumber,
              'PhoneNumber2': row.phonenumber2,
              'PhoneNumber3': row.phonenumber3
            })
          })).then(combineDirectoriesAndHospitals(directories, hospitals))
        })
      }
    })
  })
}

function combineDirectoriesAndHospitals (directories, hospitals) {
  Promise.all(hospitals.map(function (hospital) {
    hospital.Directory = directories[hospital.DirectoryID + '-directory']
  })).then(writeToFile('hospitals', hospitals))
}

function extractPharmaciesFromSpreadsheet (worksheet) {
  var pharmacies = []
  worksheet.getRows({}, function (err, rows) {
    if (err) console.log(err)
    Promise.all(rows.map(function (row) {
      if ((typeof row !== 'undefined') && (typeof row.name !== 'undefined' && row.name !== '')) {
        pharmacies.push({
          'Name': row.name,
          'PhoneNumber': row.phonenumber,
          'FaxNumber': row.faxnumber,
          'Address': row.address,
          'City': row.city,
          'State': row.state,
          'Zip': row.zip
        })
      }
    })).then(writeToFile('pharmacies', pharmacies))
  })
}

function writeToFile (collectionName, newCollection) {
  let filename = JSON_FILE_LOCATIONS[collectionName]

  if (newCollection && newCollection.length) {
    jsonfile.writeFileSync(filename, newCollection, {spaces: 2})
  }
}
