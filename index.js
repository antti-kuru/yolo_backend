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

app.post('/api/proposals', (req, res) => {
    const body = req.body
    const existingProposal = Proposal.findOne({name: body.name})
    if (body.content === undefined){
        return res.status(400).json({
            error: 'name missing'
        })
    } if (existingProposal) {
        existingProposal.quantity += 1
        existingProposal.save().then(savedProposal => {
          res.json(savedProposal)
        })
    } else {
    const proposal = new Proposal({
        name: body.content,
        quantity: 1
    })
    proposal.save().then(savedProposal => {
      res.json(savedProposal)
    })
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})