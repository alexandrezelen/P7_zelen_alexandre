const express = require('express');
const router = express.Router();
const schema = require('../middlewares/validator');

const postCtrl = require('../controllers/post');

router.post('/', postCtrl.createPost);
// router.get('/getProfile', auth, userCtrl.getUser);
// router.get('/updateUser', auth, userCtrl.updateUser);
// router.get('/deleteUser', auth, userCtrl.deleteUser);
router.get('/byId/:id', postCtrl.getPostById);
router.get('/', postCtrl.getAllPosts);

module.exports = router;