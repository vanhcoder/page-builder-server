const mongoose = require('mongoose');

const MenusSchema = new mongoose.Schema({
    name: {
        type: String ,
        required : true,
    },
    slug: {
        type: String ,
        required : true,
    },
},{timestamps: true})
module.exports = mongoose.model('menus', MenusSchema)