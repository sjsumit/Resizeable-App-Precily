const mongoose = require('mongoose')


const templateSchema = new mongoose.Schema({

    windowName: {
        type: String,
        required: true
    },
    addCount: {
        type: Number,
        required: true
    },
    updateCount: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('CountText',templateSchema)
