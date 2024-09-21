const User = require("../model/userModel");
const sendMailer = require('../util/mailer')
const {forgot} = require('../util/mailForm') 

exports.signup = async (req, res) => {
    try {
        const { name, user_email, user_password } = req.body;
        // const name = req.body.name;
        // const email = req.body.email;
        const userExist = await User.findOne({ user_email: user_email })
        if (userExist) {
            req.flash('info', 'email is already exist')
            return res.redirect('/signup')
        } else {
            const user = await User.create({
                user_name: name, user_email, user_password
            })


            if (user) {
                res.redirect('/signin')
            } else {
                res.redirect('/signup')
            }
        }


    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ user_email: user_email })
        if (!user) {
            res.json("Email not found")
        }
        if (user.user_password !== user_password) {
            res.json("password not match")
        }
        const userData = {
            name: user.user_name,
            email: user.user_email
        }
        //set data in cookie
        res.cookie('user', userData, { httpOnly: true });
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }

    
    // res.json("login successfully!")
}