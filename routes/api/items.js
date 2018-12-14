const express = require('express');

const router = express.Router();

//Item Model
const Item = require('../../models/Item');

// @route           GET /api/items
// @description     Get all items
// @access          public

//router.get instead of app.get without evaquated routing /api/items can be omitted because of the app.use in server.js
router.get("/", (req,res) => {
    Item.find()
        .sort({date : -1})
        .then(items => res.json(items));
});

// @route           POST api/items
// @description     create a item
// @access          public

//router.post instead of app.post without evaquated routing /api/items can be omitted 
router.post("/", (req,res) => {

    const newItem = new Item({
        name: req.body.name
    });

    newItem
    .save()
    //json return as response the saved item
    .then(item => res.json(item));
});

// @route           DELETE api/items/:id
// @description     delete a item
// @access          public

//router.get instead of app.get without evaquated routing /api/items can be omitted 
router.delete("/:id", (req,res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))   //returns success: true 
    .catch(err => res.status(404).json({success:false}));     
});
    

//make the router accessible in other files
module.exports = router;