const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const { createTokenUser, attachCookiesResponse, checkPermission } = require('../utils');

const getAllUser = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users })
}
const getSingleUser = async (req, res) => {
    const { params: { id: userId } } = req;
    const user = await User.findOne({ _id: userId }).select('-password');

    if (!user) {
        throw new CustomError.NotFoundError(`No user with id: ${userId}`)
    }
    checkPermission(req.user, user._id);
    res.status(StatusCodes.OK).json({ user })
}
const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}
const updateUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new CustomError.BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;
    await user.save()
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values')
    }
    const user = await User.findOne({ _id: req.user.userId });
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnAuthorizedError('Invalid Credential')
    }
    user.password = newPassword;
    // because we go with user.save() -> the password still be hashed
    await user.save()

    res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' })
}

module.exports = {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}