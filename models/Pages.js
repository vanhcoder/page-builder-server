const mongoose = require('mongoose');

const PagesSchema = new mongoose.Schema({
    name: {
        type: String ,
        required : true,
        unique : true,
    },
    slug: {
        type: String ,
        required : true,
        unique : true,
    },
    sectionId:{
        type:Array,
        required : false,
        unique : true,
    }
},{timestamps: true})
module.exports = mongoose.model('pages', PagesSchema)