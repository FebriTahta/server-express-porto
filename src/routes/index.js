const express = require("express");

const techController = require("../tech/tech.controller");
const authController = require("../auth/auth.controller");
const articleController = require("../article/article.controller");
const profileController = require("../profile/profile.controller");
const {uploadImage} = require("../utils");
// applied middlewares
const VerifyToken = require("../middlewares");
// applied router express
const router = express.Router();
// upload 
const upload = uploadImage();

// auth
router.post('/register', VerifyToken(['superadmin']), authController.registerController);
router.post('/login', authController.loginController);

// articles
router.get('/articles', articleController.articleList);
router.get('/articles/:slug', articleController.findArticle);
router.post('/articles', articleController.createArticle);

// techsSkills
router.get('/techs', techController.techList);
router.post('/techs', techController.createTech);
router.get('/techs/:techName', techController.findTech);

// profile
router.post('/update-profile-by-nick', upload.single('photo') ,profileController.createOrUpdateByNick);
router.post('/update-profile-by-id', upload.single('photo'), profileController.createOrUpdateById);
router.get('/get-first-profile', profileController.getFirstProfile);


module.exports = router;