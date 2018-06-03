const { promisify } = require('util')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = 'mongodb://localhost:27017/'

async function main() {
  let connection = await MongoClient.connect(url)
  console.log('Tada. Connected successfully to server')
  let db = await connection.db('test')
  
  await inserts(db)
  await updates(db)
  await deletes(db)
  await searchs(db)

  await connection.close()  
}

async function inserts(db) {
  let collection = db.collection('col1')
  let result = await collection.insert([
    {name : 'Bob'},
    {name : 'John'},
    {name : 'Peter'},
  ])
  console.log(`Inserted ${result.result.n} documents into the "col1" collection`)
}
  
async function updates(db) {
  let collection = db.collection('col1')
  let result = await collection.update({name : 'Bob'},
    {$set : {name: 'SpongeBob'}}
  )
  console.log(`Updated ${result.result.n} documents into the "col1" collection`)
}

async function deletes(db) {
  let collection = db.collection('col1')
  let result = await collection.remove({name : 'John'})
  console.log(`Removed ${result.result.n} documents from the "col1" collection`)
}

async function searchs(db) {
  let collection = db.collection('col1')
  let result = await collection.find({name : 'Peter'}).toArray()
  console.log(`Found ${result.length} documents from the "col1" collection:`)
  console.dir(result)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})