const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config()
const auth = (req, res) => {
    if(req.body.username == "Nattan" && req.body.password == "pippi") {
    const payload = {
        username: "Nattan",
        id: 234
    }
     const token = jwt.sign(payload, process.env.JWT_SECRET)
     res.json({token})
    }
}

module.exports = {auth}