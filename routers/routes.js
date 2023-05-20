const router = require('express').Router();

const UserController = require('../controllers/UserController');

const multer = require('multer');

const upload = multer({ dest: 'public/uploads/' });


/* ======== import files ========= */
const {
  requireAuth,
  checkCurrentLogin,
  redirectLoggedIn,
} = require('../middleware/AuthMiddleware');
const { singupValidator, loginValidator } = require('../middleware/validator/userValidator');
const decorateHtmlResponse = require('../middleware/decorateHtmlResponse');

/* ======= Get Routes ======= */
router.get('/', UserController.getHome)
router.get('/home', UserController.getHome)
router.get('/about', UserController.getAbout)
router.get('/admin', UserController.getAdmin)
router.get('/booked', UserController.getBooked)
router.get('/user', UserController.getUser)
router.get('/worker', UserController.getWorker)
router.get('/workers', UserController.getWorkerDesh)
router.get('/service', UserController.getServiceData)
router.get('/login', decorateHtmlResponse('Home'), redirectLoggedIn, UserController.newlogin,);

router.get(
  '/workerlogin', UserController.workerlogin,
);


router.get(
  '/profile', UserController.profile,
);
router.get(
  '/signup',
  decorateHtmlResponse('SignUp'),
  checkCurrentLogin,
  UserController.registerC,
);

router.get(
  '/userupdate',
  UserController.userUpadateC,
);

router.get(
  '/request',
  UserController.mediReqC,
);

router.get(
  '/workersignup',
  decorateHtmlResponse('SignUp'),
  UserController.workerRegisterC,
);

router.get('/logout', UserController.logout);
router.get('/workerlogout', UserController.WorkerLogout);
router.get('/adminlogout', UserController.adminLogout);

router.get('/verify-account/:id', UserController.accountVerify)
router.get('/verify-worker-account/:id', UserController.workerAccountVerify)
router.get('/hold-worker-account/:id', UserController.workerAccountHold)

/* ======= Post routes ======== */
router.post('/alogin', UserController.adminLoginData)
router.post('/add-medi', UserController.mediData)
router.post('/add-medicine', UserController.medicineData)
router.post('/login', decorateHtmlResponse('Login'), UserController.loginC)
router.post('/workerlogin', UserController.workerloginC)
router.post(
  '/signup', upload.fields([{ name: 'propic' }]),
  decorateHtmlResponse('SignUp'),
  singupValidator,
  UserController.insertRegisterC,
);

router.post(
  '/userupdate', upload.fields([{ name: 'propic' }]), UserController.insertUserUpadateC,
);

router.post(
  '/workersignup', upload.fields([{ name: 'propic' },
  { name: 'nid1' },
  { name: 'nid2' }]),
  UserController.insertWorkerRegisterC,
);

router.get(
  '/medicine',
  UserController.getMedicineData
)

router.get(
  '/searchmedicine', UserController.getSearchMediData
)

router.post('/book-service', UserController.bookData)

module.exports = router;
