const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const User = db.User;

const userController = {
    register : (req, res) => {
        res.render('register');
    },

    processRegister: async(req, res) =>{
        try {
            let pass = await bcrypt.hash(req.body.password, 10)
            let user = {
                name: req.body.name,
                email: req.body.email,
                password: pass,
                user_category_id: req.body.category? req.body.category : 2
            };
console.log (req.body);

            await db.User.create(user);
            res.redirect("/login")
            
        } catch (error) {
            console.log (error)
        }

    },

    login : (req, res) => {

        res.render('login');
    },


processLogin : async (req, res) => {
    try {
        let validUser = await db.User.findOne({
            where:{
                email: req.body.email
            }
        })
        if(!validUser) {
            return res.render('login', {
                error: {
                    email:{
                        msg: "usuario invalido"
                    }
                }
            })
        }
        const validPass = await bcrypt.compare(req.body.password, validUser.password)
        if (!validPass) {
            return res.render('login', {
                error: {
                    password:{
                        msg: "password invalida"
                    }
                }
            })
        }
        let admin = 1
        let user = 2

        if (validUser.user_category_id == admin) {
            req.session.admin = validUser
            return res.render('profile', {
                user: req.session.admin
            })
        }
        if (validUser.user_category_id == user) {
            req.session.user = validUser
            return res.render('profile', {
                user: req.session.user
            })
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
},
}


module.exports = userController;