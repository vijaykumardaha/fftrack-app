const express = require('express')
const path = require('path');
const router = express.Router()
const { userLogin, resetPass, forgetPass } = require('../controllers/auth-controller');
const { GetErrorFileName, GetRequestFileName } = require('../utils/helpers');
const JoiValidator = require("../middlewares/auth-joi-validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         username: "example@gmail.com"
 *         password: "********"
 *     Forgot:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: User email
 *       example:
 *         username: "example@gmail.com"
 *     Reset:
 *       type: object
 *       required:
 *         - token
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Reset password token
 *         password:
 *           type: string
 *           description: New password
 *       example:
 *         password: "********"
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login api
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User login.
 *       500:
 *         description: Some server error
 */
router.post('/login', JoiValidator('login'), userLogin);

/**
 * @swagger
 * /forgot:
 *   post:
 *     summary: User forgot api
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Forgot'
 *     responses:
 *       200:
 *         description: Forgot password successfully.
 *       500:
 *         description: Some server error
 */
router.post('/forgot', JoiValidator('forget'), forgetPass);

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Reset password api
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reset'
 *     responses:
 *       200:
 *         description: Reset password successfully.
 *       500:
 *         description: Some server error
 */
router.post('/reset', JoiValidator('reset'), resetPass);

/**
 * @swagger
 * /error:
 *   get:
 *     summary: Download today error log
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Some server error
 *
 */
router.get('/error', function (_req, res, _next) {
    const fileName = GetErrorFileName();
    res.download(path.join(__dirname, `../../logs/${fileName}`));    
});

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Download today request log
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Some server error
 *
 */
router.get('/info', function (_req, res, _next) {
    const fileName = GetRequestFileName();
    res.download(path.join(__dirname, `../../logs/${fileName}`));    
});

module.exports = router
