const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const { createTokenUser, attachCookiesResponse } = require('../utils');

const getAllUser = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users })
}
const getSingleUser = async (req, res) => {
    res.send('get single user')
}
const showCurrentUser = async (req, res) => {
    res.send('show current user')
}
const updateUser = async (req, res) => {
    res.send('update user')
}
const updateUserPassword = async (req, res) => {
    res.send('update user password')
}

module.exports = {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}