const invalidPathController = require('express').Router();

invalidPathController.get('*',(req,res)=>{
    res.render('404',{
        title: 'Invalid Path'
    })
})

module.exports = invalidPathController