const express = require("express");
const router = express.Router();

// Get Page model
const Page = require('../models/page')

// Get pages index
router.get("/", (req, res) => {
  Page.find({}).sort({sorting: 1}).exec((err,pages)=>{
    res.render('admin/pages',{
            pages:pages
    });
  });
});

// Get add pages
router.get("/add-page", (req, res) => {
        const title = "";
        const slug = "";
        const content = "";

        res.render('admin/add_page', {
            title: title,
            slug: slug,
            content:content
        })
});

// Post add pages
router.post("/add-page", (req, res) => {
  req.checkBody("title", "Title must have a value.").notEmpty();
  req.checkBody("content", "Content must have a value.").notEmpty();

  const title = req.body.title;
  const slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
  if (slug == "") slug = title.replace(/\s+/g, "-").toLowerCase();
  const content = req.body.content;

  const errors = req.validationErrors();

  if (errors) {
    console.log("errors");
    res.render("admin/add_page", {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
    });
  } else {
    Page.findOne({slug: slug},(err, page)=>{
        if (page) {
            req.flash('danger', 'Page slug exists, choose another.');
            res.render("admin/add_page", {
                title: title,
                slug: slug,
                content: content,
              });
        }else{
            const page = new Page({
                title: title,
                slug: slug,
                content: content,
                sorting: 100
            });

            page.save((err)=>{
                if (err) return console.log(err);

                req.flash('success', 'Page added');
                res.redirect('/admin/pages')
                    
                
            });
        }
    })
  }
});


// Post reorder index
router.post("/reoerder-pages", (req, res) => {
   const ids = req.body['id[]'];
   const count = 0;

   for (let i = 0; i < ids.length; i++) {

       let id = ids[i];
       count++;
((count)=>{
    Page.findById(id, ()=>{
        page.sorting = count;
        page.save((err)=>{
             if (err) {
                 return console.log(err);
                 
             }
        })
    })
})(count)
     
   }
  });

  // Get Edit pages
router.get("/edit-page/:slug", (req, res) => {
 Page.findOne({slug: req.params.slug}, (err,page)=>{

  if (err) return console.log(err);

  res.render('admin/edit_page', {
    title: page.title,
    slug: page.slug,
    content: page.content,
    id: page._id
});

 });


});


// Post edit pages
router.post("/edit-page/:slug", (req, res) => {
  req.checkBody("title", "Title must have a value.").notEmpty();
  req.checkBody("content", "Content must have a value.").notEmpty();

  const title = req.body.title;
  const slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
  if (slug == "") slug = title.replace(/\s+/g, "-").toLowerCase();
  const content = req.body.content;
  const id = req.body.id;

  const errors = req.validationErrors();

  if (errors) {
    console.log("errors");
    res.render("admin/edit_page", {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
      id:id
    });
  } else {
    Page.findOne({slug: slug, _id:{'$ne':id}},(err, page)=>{
        if (page) {
            req.flash('danger', 'Page slug exists, choose another.');
            res.render("admin/edit_page", {
                title: title,
                slug: slug,
                content: content,
                id:id
              });
        }else{

          Page.findById(id, (err,page)=>{

                    if (err) return console.log(err);
                    page.title = title;
                    page.slug = slug;
                    page.content = content;


                      page.save((err)=>{
                        if (err) return console.log(err);

                        req.flash('success', 'Page added');
                        res.redirect('/admin/pages')
                            
                        
                      });

          });
            
          
        }
    })
  }
});

// Get delete  page index
router.get("/delete-page/:id", (req, res) => {
      Page.findByIdAndRemove(req.params.id, (err)=>{
        if(err) return console.log(err);
        req.flash('success', 'Page delete');
        res.redirect('/admin/pages/')
      })
});

//   Exports
module.exports = router;
