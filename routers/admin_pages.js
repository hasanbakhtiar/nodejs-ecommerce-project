const express = require('express');
const router = express.Router();

// Get pages index
router.get('/',(req,res)=>{
    res.send('admin area');
    });

// Get add pages 
router.get('/add-page',(req,res)=>{


    const title = "";
    const slug = "";
    const content = "";

    res.render('admin/add_page', {
            title: title,
            slug: slug,
            content: content
    });
    
    });


module.exports = router;