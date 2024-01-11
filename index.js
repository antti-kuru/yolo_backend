require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Proposal = require('./models/proposal')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))



app.get('/api/proposals', (req, res) => {
  console.log('here')
    Proposal.find({}).then(proposals => {
      res.json(proposals)
    })
})

app.post('/api/proposals', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
        error: 'Name missing'
    })
  }
  const proposal = new Proposal({
    name: body.name,
    quantity: 1
  })

  proposal.save().then(savedProposal => {
    res.json(savedProposal)
  })
    .catch(error => next(error))
})

app.put('/api/proposals/:id', (req, res, next) => {
  const body = req.body

  const proposal = {
    name: body.name,
    quantity: body.quantity + 1
  }

  Proposal.findByIdAndUpdate(req.params.id, proposal, {new:true})
    .then(updatedProposal => {
      res.json(updatedProposal)
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})