const createTokenUser = require('./createTokenUser');
const {
    createJWT,
    isTokenValid,
    attachCookiesResponse
} = require('./jwt');
const checkPermission = require('./checkPermission');

module.exports = {
    createTokenUser,
    createJWT,
    isTokenValid,
    attachCookiesResponse,
    checkPermission
}