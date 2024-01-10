const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to' + url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const proposalSchema = new mongoose.Schema({
    name: String,
    quantity: Object,
})

proposalSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returned.returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Proposal', proposalSchema)