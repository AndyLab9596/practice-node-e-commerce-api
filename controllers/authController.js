const User = require('../models/User');
const CustomError = require('../errors/index');
const { createTokenUser, attachCookiesResponse } = require('../utils');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    const { email, name, password } = req.body;

    // Check if email exist
    const isEmailAlreadyExist = await User.findOne({ email });
    if (isEmailAlreadyExist) {
        throw new CustomError.BadRequestError('Email already exist')
    }

    // first user register is role admin
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    // Create user
    const user = await User.create({ name, email, password, role });

    // Create token
    const tokenUser = createTokenUser(user);
    attachCookiesResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
    res.send('login user')
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expiresIn: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

module.exports = { register, login, logout }