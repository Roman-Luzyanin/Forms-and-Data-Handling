// const { search } = require("../routes/usersRouter");
const usersStorage = require("../storages/usersStorage");
const { body, validationResult, matchedData } = require('express-validator');

exports.usersListGet = (req, res) => {
    res.render('index', {
            title: 'User List',
            users: usersStorage.getUsers(),
        });
};

exports.usersCreateGet = (req, res) => {
    res.render('createUser', {title: 'Create User'});
};

const alphaErr = 'must contain only letters';
const lengthErr = 'must be between 1 and 10 characters';

const validateUser = [
    body('firstName').trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`First name ${lengthErr}`),
    body('lastName').trim()
    .isAlpha().withMessage(`Last Name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`Last name ${lengthErr}`),
    body('age').trim().optional({ checkFalsy: true })
    .isInt({min: 18, max: 120}).withMessage('Age must be a number between 18 and 120'),
    body('email').trim()
    .isEmail().withMessage('Must be valid email address'),
    body('bio').trim()
    .isLength({max: 200}).withMessage('Bio must be max 200 characters')
]

exports.usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createUser', {
                title: 'Create User',
                errors: errors.array(),
            })
        }

        const { firstName, lastName, age, email, bio } = matchedData(req);
        usersStorage.addUser({ firstName, lastName, age, email, bio });
        res.redirect('/');
    }
]

exports.usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    res.render('updateUser', {
        title: 'Update User',
        user
    })
}

exports.usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = usersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('updateUser', {
                title: 'Update User',
                user,
                errors: errors.array(),
            })
        }

        const { firstName, lastName, age, email, bio } = matchedData(req);
        usersStorage.updateUser(req.params.id, { firstName, lastName, age, email, bio });
        res.redirect('/');
    }
]

exports.userDelete = (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect('/');
}

exports.userSearch = (req, res) => {
    const { name, email } = req.query;
    const result = usersStorage.searchUser({ name, email });
    res.render('search', {result})
}