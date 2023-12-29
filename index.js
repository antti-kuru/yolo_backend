const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


let proposals = [
      {
        "name": "nachopelti",
        "quantity": 4,
        "id": 1
      },
      {
        "name": "lasagne",
        "quantity": 2,
        "id": 2
      },
      {
        "name": "kermaperunat",
        "quantity": 1,
        "id": 3
      },
      {
        "name": "uunilohi",
        "quantity": 2,
        "id": 4
      },
      {
        "name": "kebab",
        "quantity": 1,
        "id": 5
      },
      {
        "name": "kasviswings",
        "quantity": 1,
        "id": 6
      }
    ]

app.get('/api/proposals', (req, res) => {
    res.json(proposals)
})

const generateID = () => {
    const maxID = proposals.length > 0
        ? Math.max(... proposals.map(p => p.id))
        : 0
        return maxID + 1
}

app.post('/api/proposals', (req, res) => {
    const body = req.body

    if (!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (proposals.find(p => p.name === body.name)){

    }
    const proposal = {
        name: body.name,
        quantity: 1,
        id : generateID()
    }
    proposals = proposals.concat(proposal)
    res.json(proposal)

})

const PORT = 3002
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})