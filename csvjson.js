// Dependencies
const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

// hardcoded file names and locations
const csvFile = path.join(__dirname, 'customer-data.csv')
const jsonFile = path.join(__dirname, 'customer-data.json')

// temporary array for output data
let output = []

// add each row to the array
const loadRow = (row) => {
  output.push(row)
}

// write to a file
const writeJson = (err) => {
  if (err) {
    throw err
  }

  const content = JSON.stringify(output, null, 2)// convert from the array to JSON string

  fs.writeFileSync(jsonFile, content, 'utf8', (err) => {
    if (err) {
      throw err
    }
    console.log(`Json file saved to ${jsonFile}`)
  })
}

// execute
csv()
  .fromFile(csvFile)// read from csv file
  .on('json', loadRow)// update array on every row
  .on('done', writeJson)// create and save json file
