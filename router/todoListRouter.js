const todolistController = require('../controllers/todolistController')
const {Router} = require('express')
const requireAuth = require('../controllers/authcontroller')

const router = new Router()

router.get('/alltodolists', requireAuth.auth,todolistController.all)
router.get('/todolists/:id', todolistController.get)
router.post('/todolists', todolistController.create)
router.delete('/todolists/:id', todolistController.remove)
router.patch('/todolists/:id', todolistController.update)

module.exports = router



