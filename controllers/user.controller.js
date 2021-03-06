const User = require("../models/User")
const bcrypt = require('bcryptjs');

// create user
const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.status(400).json({
                ok: false,
                msg: 'There is already a user with the same email'
            });
        }
    
        const dbUser = new User( req.body );
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );
        dbUser.save();
        res.status(200).json({
            ok: true,
            uid: dbUser._id,
            msg: 'user has been created successfully'
        });
    } catch( err ) {
        res.status(400).json({
            ok: false,
            msg: 'an error occurred while trying to create a user'
        })
    }
}

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password, name, permissionLevel } = req.body;
    try {
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync( password, salt );
        await User.findByIdAndUpdate(id, {name: name, password: password, permissionLevel: permissionLevel});
        res.status(200).json({
            ok: true,
            msg: 'successfully updated user'
        });

    } catch(err) {
        res.status(400).json({
            ok: false,
            msg: 'an erro ocurred while trying to update a user'
        });
    }
}

// enabled/disabled user
const toggleUser = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        await User.findByIdAndUpdate(id, {isActive});
        res.status(200).json({
            ok: true,
            msg: 'user updated isActive successfully'
        });
    } catch(err) {
        res.status(200).json({
            ok: false,
            msg: 'an error ocurred while trying to update isActive user'
        });
    }

}

// find users
const findAllUsers = async (req, res) => {
    try {
        const values = await User.find({});
        res.status(200).json({
            values
        });
    } catch (err) {
        res.status(200).json({
            ok: false,
            msg: 'An error ocurred finding all users'
        });
    }
}

module.exports = {
    createUser,
    updateUser,
    toggleUser,
    findAllUsers
}