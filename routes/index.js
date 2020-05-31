const express = require('express');
const router = express.Router();
const { Users } = require('../models/mongo');
const logger = require('../logger');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'about' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'contact', formStatus: '' });
});

router.post('/contact/client', async function (req, res, next) {
   const formData = req.body;
   if(!formData){
     return res.status(402).json({ message: 'Bad request' });
   }
   if(formData && formData.name && (formData.email || formData.number)){
       try{
           const usersObj = new Users(formData);
           usersObj.save();
           return res.status(201).render('contact', { formStatus: 'submitted', title: 'contact' });
       }catch (e) {
           logger.error(`Failed to save user - ${JSON.stringify(formData)} - ERROR - `, e);
           return res.status(500).render('contact', { formStatus: 'failed', title: 'contact' });
       }
   }else{
     return res.status(402).json({ message: 'Name, email or mobile is required' });
   }

});

module.exports = router;
