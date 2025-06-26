const { Router } = require('express')
const Category = require('../../models/Category')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find()
        if (!categoryList) throw new Error('No Category List found')
        res.status(200).json(categoryList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const category = await newCategory.save()
        if (!category) throw new Error('Something went wrong saving the Category')
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Category.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



module.exports = router
