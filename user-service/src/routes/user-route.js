const express = require('express')
const path = require('path');
const router = express.Router()
const { createUser, getUsers } = require('../controllers/user-controller');
const { GetErrorFileName, GetRequestFileName } = require('../utils/helpers');
const { authentication } = require('../middlewares/user-middleware');
const JoiValidator = require("../middlewares/user-joi-validator");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - mobile
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         mobile:
 *           type: string
 *           description: Mobile number of the user
 *       example:
 *         name: "Vijay Kumar"
 *         email: "example@gmail.com"
 *         mobile: "9899596977"
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Some server error
 *
 */
router.get('/', getUsers);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *       500:
 *         description: Internal server error
 *
 */
router.post('/', JoiValidator('register'), createUser);

/**
 * @swagger
 * /error:
 *   get:
 *     summary: Download today error log
 *     tags: [User]
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
 *     tags: [User]
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
