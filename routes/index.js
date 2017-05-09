const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const db = require('../models/url.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req,res,next) {
  res.status(200).send('hi')
})

// redirect to the url by its is
router.get('/redirect/:id', (req,res,next)=>{
  db.findById(req.params.id,(err,url) =>{
    if (err) {
      res.send(new Error('No such path'))
    }
    else
    res.status(200).json({error: false, url: url.path})
  })
})

router.get('/id/:id',(req,res,next)=>{
  db.findById(req.params.id,(err,url)=>{
    console.log('id:'+req.id);
    if(err)
      next(new Error(err))
    else if(!url)
      next(new Error('Url is not found'))
      else
      res.send('url is found!' + url)
  })
})



router.post('/',(req,res,next) =>{
  let path = req.body.path
  let url = new db({
    path
  })

  console.log('path',path);
  url.save((err)=> {
    if(err)
    return next(new Error(err))
    else
    res.json({message:'success', url: {_id: url._id,path: url.path}})
  })

})
module.exports = router;
