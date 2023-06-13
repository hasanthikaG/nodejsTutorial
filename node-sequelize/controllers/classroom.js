const Classroom = require("../models").Classroom;
const Student = require(".../models").Student;

const list = (req, res) => {
    return Classroom.findAll({
        include: [{
            model: Student,
            as: 'students'
        }],
        order: [
            ['createdAt', 'DESC'],
            [{ model: Student, as: 'students' }, 'createdAt', 'DESC']
        ]
    })
        .then((classrooms) => res.status(200).send(classrooms))
        .catch((error) => { res.status(400).send(error) })
};


const getById = (req, res) => {
    return Classroom
        .findByPk(req.params.id, {
            include: [{
                model: Student,
                as: 'students'
            }],
        })
        .then((classroom) => {
            if (!classroom) {
                return res.status(404).send({
                    message: 'Classroom Not Found',
                });
            }
            return res.status(200).send(classroom);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
};

const add = (req, res) => {
    return Classroom
        .create({
            class_name: req.body.class_name,
        })
        .then((classroom) => res.status(201).send(classroom))
        .catch((error) => res.status(400).send(error));
};


const addWithStudents = (req, res) => {
    return Classroom
        .create({
            class_name: req.body.class_name,
            students: req.body.students,
        }, {
            include: [{
                model: Student,
                as: 'students'
            }]
        })
        .then((classroom) => res.status(201).send(classroom))
        .catch((error) => res.status(400).send(error));
};

const update = (req, res) => {
    return Classroom.findByPk(req.params.id, {
        include: [{ model: Student, as: 'students' }]
    }).then((classroom) => {
        if (!classroom) {
            return res.status(404).send({ message: "Classroom Not Found" })
        }

        return classroom.update({ class_name: req.body.class_name || classroom.class_name })
            .then(() => res.status(200).send(classroom))
            .catch((error) => res.status(400).send(error))
    }).catch((error) => {
        res.status(400).send(error)
    })
}

const delete = (req, res) => {
    return Classroom.findByPk(req.params.id).then((classroom) => {
        if (!classroom) {

        }
    })
}