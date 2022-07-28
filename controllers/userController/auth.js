const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

const signup = async function(req, res) {
    let {username, password} = req.body

    if (username == null || password == null)
        res.json({success: false, error: 'Username/password cannot be empty', statusCode: 422})

    try {
        let user = await User.findOne({'username': username})
        
        if (user)
            res.json({success: false, error: 'Username already exists', statusCode: 400})

        else {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username
            })

            // Hash password
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(req.body.password, salt);

            // Store user
            user = await User.create(newUser)
            res.json({success: true, data: user, statusCode: 201})
        } 
    } catch(err) {
        res.json({success: false, error: err.message, statusCode: 401})
    }
}

const login = async function(req, res) {
    let {username, password} = req.body

    if (username == null || password == null )
        res.json({success: false, error: 'Username/password cannot be empty', statusCode: 422})

    try {
        let user = await User.findOne({'username': username})
        if (!user)
            res.json({success: false, error: 'Username not found', statusCode: 404})
        else {
            // Check if password matches
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword == false)
                res.json({success: false, error: 'Invalid Credentials', statusCode: 401})
            else {
                // Sign token
                const payload = {
                    id: user.id,
                    name: user.name
                }

                const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '12h'})
                res.json({success: true, data: {user, token}, statusCode: 200})
            }
        }
    }
    catch (err) {
        res.json({success: false, error: err.message, statusCode: 401})
    }
}

module.exports = {
    signup,
    login
}