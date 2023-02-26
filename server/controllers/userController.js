const User = require('../models/User');



// handle errors
const handleErrors = (err) => {

    let errors = { msg: err.message };

    // email
    if (err.message === 'incorrect email') {
        errors.message = 'Incorrect email! Please try again.';
    }

    // phone
    if (err.message === 'incorrect phone') {
        errors.message = 'Incorrect phone! Please try again.';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.message = 'Email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors.message = properties.message;
        });
    }

    return errors;
};

module.exports.addUser = async (req, res) => {
    const { name, email, phone, image } = req.body;
    try {
        const user = await User.create({ name, email, phone, image });
        res.status(200).json({
            user: user,
            resCode: 200,
            resMessage: 'User registered successfully',
            resType: 'success',
        });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(200).json({
            resCode: 401,
            errors: errors,
            resType: 'danger',
            resMessage: errors.message,
        });
    }
};

module.exports.getUsers = async (req, res) => {
    const limit = req.body.limit;
    const skip = req.body.skip;
    try {
        const data = await User.getUsers(limit, skip);
        if (data.total > 0) {
            res.status(200).json({
                resCode: 200,
                resMessage: 'Success',
                resType: 'success',
                resTitle: 'Success',
                resData: data,
            });
        } else {
            res.status(200).json({
                resCode: 100,
                resMessage: 'No user found',
                resType: 'warning',
                resTitle: 'No Data',
            });
        }
    } catch (err) {
        res.status(200).json({
            error: err,
            resCode: 150,
            resMessage: `Couldn't update course. Please try again`,
            resType: 'danger',
            resTitle: 'Error',
        });
    }
};

module.exports.updateUser = async (req, res) => {
    const arguments = req.body.arguments;
    try {
        const userUpdate = await User.updateUser({ _id: req.body.id }, arguments);
        res.status(201).json({
            resCode: 200,
            resMessage: 'Success',
            resType: 'success',
        });
    } catch (err) {
        res.status(200).json({
            error: errors,
            resCode: 400,
            resMessage: 'Update Failed',
            resType: 'danger',
        });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        await User.deleteUser(req.params.id);
        res.status(201).json({
            resCode: 200,
            resMessage: 'User has been deleted',
            resType: 'success',
        });
    } catch (err) {
        es.status(200).json({
            error: err,
            resCode: 400,
            resMessage: 'failed',
            resType: 'danger',
        });

    }
}