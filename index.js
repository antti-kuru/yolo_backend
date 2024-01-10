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

app.post('/api/proposals', async (req, res) => {
  const body = req.body;

  // Check if the name is missing
  if (body.name === undefined) {
      return res.status(400).json({
          error: 'Name missing'
      })
  }

  try {
      // Find the existing proposal by name
      const existingProposal = await Proposal.findOneAndUpdate({ name: body.name })

      if (existingProposal) {
          // If proposal exists, update its quantity
          existingProposal.quantity += 1
          console.log(existingProposal.quantity)
          const updatedProposal = await existingProposal.save()
          res.json(updatedProposal)
      } else {
          // If proposal doesn't exist, create a new one
          const proposal = new Proposal({
              name: body.name,
              quantity: 1
          })

          const savedProposal = await proposal.save()
          res.json(savedProposal)
      }
  } catch (error) {
      console.error('Error processing proposal:', error)
      res.status(500).json({
          error: 'Internal Server Error'
      })
  }
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})