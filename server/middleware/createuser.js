const User = require('../model/users')

const Signup = async (req, res, next) => {
    try {
        const { username } = req.body;

        const isUsername = await User.findOne({ username: username })

        if (isUsername) {
            res.json({ success: false, message: 'User already exist!' })
        } else {
            next()
        }
    } catch (error) {
        return next(`Error signup middleware: ${error}`)
    }
}

module.exports = Signup