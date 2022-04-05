const express = require('express');
const router = express.Router();

const {
    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController');

const {
    authenticateUser,
    authorizePermissions
} = require('../middleware/authentication');

router.route('/').get([authenticateUser, authorizePermissions('admin')], getAllUser)

router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)

router.route('/:id').get(getSingleUser)

module.exports = router;