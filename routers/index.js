const express = require('express');

const mainRouter = require('./main.js');
const userRouter = require('./user.js');
const taskRouter = require('./task.js');
const authRouter = require('./auth.js');
const chatRouter = require('./chat.js');

const router = express.Router();

router.use('/task', taskRouter);
router.use('/chat', chatRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use(mainRouter);

module.exports = router;