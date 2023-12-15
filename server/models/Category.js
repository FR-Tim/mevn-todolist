const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

const Category = model('category', CategorySchema)

module.exports = Category