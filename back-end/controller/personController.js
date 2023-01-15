const Person = require('../model/person');

const getAllPerson = async (req, res) => {
    const persons = await Person.find({});
    res.status(200).json(persons);
}

module.exports = {
    getAllPerson
}
