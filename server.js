const { promisify } = require('util') 
const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')

const database = {
  url: 'mongodb://localhost:27017/',
  name: 'edx-int2node-course-db'
}
const port = 3000

async function main() {
  const app = express()
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(errorhandler())

  const connection = await mongodb.MongoClient.connect(database.url)
  const db = await connection.db(database.name)

  app.use((req, res, next) => {
    req.db = db
    return next()    
  })

  app.use(require('./routes'))

  await app.listen(port)
  console.log(`Server at http://localhost:${port}/`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})