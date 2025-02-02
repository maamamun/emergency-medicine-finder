const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getHome)

router.get('/signup', UserController.getSignupForm)


router.post('/add-user', UserController.signupData)
router.get('/login', UserController.getloginForm)

// router.get('/home', UserController.userData)

router.post('/login', UserController.loginData)


router.get('/logout', UserController.getlogout)

router.get('/admin', UserController.getAdmin)




//
module.exports = router;
