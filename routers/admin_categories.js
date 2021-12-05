const express = require("express");
const router = express.Router();

// Get Category model
const Category = require('../models/category')

// Get category index
router.get("/", (req, res) => {
  Category.find((err,categories)=>{
    if(err) return console.log(err);
    res.render('admin/categories',{
      categories:categories
    });
  });
});

// Get add pages
router.get("/add-category", (req, res) => {
        const title = "";
     

        res.render('admin/add_category', {
            title: title,
      
        })
});

// Post add pages
router.post("/add-category", (req, res) => {
  req.checkBody("title", "Title must have a value.").notEmpty();

  const title = req.body.title;
  const slug = title.replace(/\s+/g, "-").toLowerCase();

  const errors = req.validationErrors();

  if (errors) {
    console.log("errors");
    res.render("admin/add_category", {
      errors: errors,
      title: title
    });
  } else {
    Category.findOne({slug: slug},(err, category)=>{
        if (category) {
            req.flash('danger', 'Category title exists, choose another.');
            res.render("admin/add_category", {
                title: title
              });
        }else{
            const category = new Category({
                title: title,
                slug: slug
            });

            category.save((err)=>{
                if (err) return console.log(err);

                req.flash('success', 'Category added');
                res.redirect('/admin/categories')
                    
                
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
router.get("/edit-category/:id", (req, res) => {
 Category.findById(req.params.id, (err,category)=>{

  if (err) return console.log(err);

  res.render('admin/edit_category', {
    title: category.title,
    id: category._id
});

 });


});


// Post edit category
router.post("/edit-category/:id", (req, res) => {
  req.checkBody("title", "Title must have a value.").notEmpty();

  const title = req.body.title;
  const slug = title.replace(/\s+/g, "-").toLowerCase();
  const id = req.params.id;

  const errors = req.validationErrors();

  if (errors) {
    console.log("errors");
    res.render("admin/edit_category", {
      errors: errors,
      title: title,
      id:id
    });
  } else {
    Category.findOne({slug: slug, _id:{'$ne':id}},(err, category)=>{
        if (category) {
            req.flash('danger', 'category slug exists, choose another.');
            res.render("admin/edit_category", {
                title: title,
                id:id
              });
        }else{

          Category.findById(id, (err,category)=>{

                    if (err) return console.log(err);
                    category.title = title;
                    category.slug = slug;


                    category.save((err)=>{
                        if (err) return console.log(err);

                        req.flash('success', 'category edited');
                        res.redirect('/admin/categories/edit-category/'+id)
                            
                        
                      });

          });
            
          
        }
    })
  }
});

// Get delete  category 
router.get("/delete-category/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err)=>{
        if(err) return console.log(err);
        req.flash('success', 'category delete');
        res.redirect('/admin/categories/')
      })
});

//   Exports
module.exports = router;
