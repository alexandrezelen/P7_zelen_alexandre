const express = require('express');
const router = express.Router();
const schema = require('../middlewares/validator');

const userCtrl = require('../controllers/user');

router.post('/signup', schema, userCtrl.signup);
// router.post('/login', auth, userCtrl.login);
// router.get('/getProfile', auth, userCtrl.getUser);
// router.get('/updateUser', auth, userCtrl.updateUser);
// router.get('/deleteUser', auth, userCtrl.deleteUser);

module.exports = router;