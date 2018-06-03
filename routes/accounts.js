const { promisify } = require('util') 
const express = require('express') 
const mongodb = require('mongodb')
const route = module.exports = express.Router()

route.get('/', async (req, res, next) => {
  try {
    let accounts = await req.db.collection('accounts')
      .find({}, { sort: { _id: -1 } })
      .toArray()

    res.send(accounts)
  } catch(e) {
    next(e)
  }
})

route.get('/:accountId', async (req, res, next) => {
  try {
    let account = await req.db.collection('accounts')
    .findOne({ _id: String(req.params.accountId) })

    if(!account)
      res.sendStatus(404)
    else
      res.send(account)
  } catch(e) {
    next(e)
  }
})

route.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    let result = await req.db.collection('accounts').insert({
      _id: String(req.body.id),
      name: req.body.name,
      balance: req.body.balance,
    })
    res.send(result)
  } catch(e) {
    next(e)
  }
})

route.put('/:accountId', async (req, res, next) => {
  try {
    let result = await req.db.collection('accounts').update({ _id: String(req.params.accountId) },
    { $set: {
      name: req.body.name,
      balance: req.body.balance,
    }})
    res.send(result)
  } catch(e) {
    next(e)
  }
})

route.delete('/:accountId', async (req, res, next) => {
  try {
    let result = await req.db.collection('accounts').remove({ _id: String(req.params.accountId) })
    res.send(result)
  } catch(e) {
    next(e)
  }
})

