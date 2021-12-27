const mongoose = require('mongoose')


const alienSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
    },
    textId: {
        type: Number,
        required: true
    },
    windowName: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('AddText',alienSchema)