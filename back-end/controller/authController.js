const Person = require('../model/person');

const login = (req, res) => {
    console.log(req.body);
    res.status(200).send({msg:"hello"});
}

const register = async (req, res) => {
    const {username, password} = req.body;
    let index;
    await Person.countDocuments(({}), (err,count) => {
        index = count + 1;
    })
    
    const user = await Person.create({
        id: index,
        name: username,
        password: password
    });
    res
        .status(200)
        .json({user:{username: user.name, id: user.id},
               token: user.createJWT()
        });
}

module.exports = { login, register }
