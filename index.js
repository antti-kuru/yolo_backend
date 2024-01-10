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

const generateID = () => {
    const maxID = proposals.length > 0
        ? Math.max(... proposals.map(p => p.id))
        : 0
        return maxID + 1
}

app.post('/api/proposals', (req, res) => {
    const body = req.body
    existingProposal = proposals.find(p => p.name === body.name)
    if (!body){
        return res.status(400).json({
            error: 'name missing'
        })
    } if (existingProposal) {
        existingProposal.quantity += 1
        res.json(existingProposal)
    } else {
    const proposal = {
        name: body.name,
        quantity: 1,
        id : generateID()
    }
    proposals = proposals.concat(proposal)
    res.json(proposal)
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})