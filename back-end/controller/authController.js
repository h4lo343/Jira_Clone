const Person = require('../model/person');
const CustomError = require('../error/custom-error');
const jwt = require('jsonwebtoken');

const me = async (req, res) => {
    const token = req.query.token;
    try{
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);     const person = await Person.find({id:payload.id});
        res.status(200).json({user:person});
    }catch (error) {
        throw new CustomError(401, "unauthorized");
    }
}

const login = async (req, res) => {
    const {name, password} = req.body;
    if(!password || !password) {
        throw new CustomError("please provide valid credentials", 400);
    }
    const user = await Person.findOne({name});
    if (!user) {
        throw new CustomError("Invalid Credentials", 401);
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(isPasswordCorrect) {
        res.status(200).json({
            user: {
                name,
                token: user.createJWT(),
            }
        })
    }
    else {
        throw new CustomError("please provide valid credentials", 400);
    }
}

const register = async (req, res) => {
    const {name, password} = req.body;
    let index;
    index = await Person.countDocuments() + 1;
    const user = await Person.create({
        id: index,
        name,
        password: password
    });
    res
        .status(200)
        .json({user:{ name: user.name, id: user.id},
               token: user.createJWT()
        });
}

module.exports = { login, register, me }
