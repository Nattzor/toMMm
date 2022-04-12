const todoController = require('../controllers/todosController')
const {Router} = require('express')
const requireAuth = require('../controllers/authcontroller')

const router = new Router()


router.get('/todoitems', todoController.allFromList)
router.get('/todositems/:id', todoController.get)
router.post('/todoitems', todoController.create)
router.patch('/todoitems/:id', todoController.update)
// router.delete('/todoitems/:id', todoController.remove)


module.exports = router
