const express=require("express");
const router=express.Router();
const {validatoruser,validationresult,validatelogin,validationresultlogin}=require('../middelware/validators')
const {isauth}=require('../middelware/isauth')

const controller=require('../controller/pagecontroller')

router.get('/',controller.index);
router.get('/biriyani',controller.biriyani);
router.get('/gravi',controller.gravy);
router.get('/nvs',controller.nvs);
router.get('/burger',controller.burger);
router.get('/pizza',controller.pizza);
router.get('/icecream',controller.icecream);
router.get('/softdrinks',controller.softdrinks);
router.get('/cokkie',controller.cokkie);
router.get('/contact',controller.contact);
router.get('/about',controller.about);
router.get('/menu',controller.menu);
router.get('/register',controller.register);
router.post('/register',validatoruser,validationresult,controller.registerpost);
router.get('/login',controller.login);
router.post('/login',validatelogin,validationresultlogin,controller.loginpost);
router.get('/home',isauth,controller.home);
router.get('/index',controller.indexx);
router.get('/profile',isauth,controller.profile);
router.get('/cart',controller.cart);

module.exports=router;