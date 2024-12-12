const UsersData = require("../database/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
if(process.env.NODE_ENV !== "production"){
    require('dotenv/config');
}

const {KEY} = process.env;
let newUser = {};
let Users = [];

const register = async (req, res) => {
    try {
        if(!req.body){
            res.status(400).send("debes indicar nombre, email, password");
        }

        const {name, email, password} = req.body;

        if(!(name && email && password)){
            res.status(400).send("debes indicar nombre, email, password");
        }

        const userExists = Users.find(user => user.email === email);

        if(userExists){
            res.status(400).send("el usuario existe, por favor inicia sesion con tus credenciales");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        newUser =  UsersData.User(name, email, encryptedPassword);

        Users = [...Users, newUser];
            
    } catch (error) {
        console.log("ha ocurrido un error", error);
    }

    return res.status(201).json(newUser);
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("indica email y contraseña");
        }

        const user = Users.find(us => us.email === email);

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({email}, KEY, {expiresIn: "2h"})
            user.token = token;
            res.status(200).json(user);
        }else{
            res.status(403).send("credenciales invalidas");
        }
    } catch (error) {
        console.log("ha ocurrido un error", error);
    }
}

module.exports = {register, login}