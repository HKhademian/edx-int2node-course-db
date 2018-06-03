const express = require('express')
const app = express()

app.use(async (req, res) => {
  await 'test'
  res.send({hello:1, world:2})
})

app.listen(3000)