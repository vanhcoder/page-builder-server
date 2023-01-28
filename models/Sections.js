const mongoose = require('mongoose');

const SectionsSchema = new mongoose.Schema({
    type: {
        type: String,
        require:true,
    },
    payload:{
        type: String,
        require:true,
    },
    index:{
        type: Number,
        require:true,
    },
    container:{
        type:Boolean,
        required: true,
    }
},{timestamps: true})
module.exports = mongoose.model('sections', SectionsSchema)