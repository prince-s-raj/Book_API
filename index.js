require("dotenv").config("./database");

const express = require("express"); // In ES6-> import express from 'express'
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import Database
const database = require("./database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initialize epress
const booky = express();
booky.use(bodyParser.urlencoded({ extended: true}));
booky.use(bodyParser.json());

// Establish DB Connection
mongoose.connect( process.env.MONGO_URL).then(() =>
    console.log("Connection Establised")
);

//------------------GET--------BOOKS----------------- //
// Get all books
/*
    Route           /        
    Description     Get all books
    Access          Public Access
    Parameter       NONE
    Methods         GET methods
*/
booky.get("/", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// Get a specific BOOKS
/*
    Route           /is        
    Description     Get specific books
    Access          Public Access
    Parameter       isbn
    Methods         GET methods
*/

booky.get("/is/:isbn", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    
    if(!getSpecificBook){
        return res.json({
            error: `No book found for ISBN of ${req.params.isbn}`
        })
    }
    return res.json({getSpecificBook});
});

// GET books based on a specific category
/*
    Route           /c        
    Description     Get specific books
    Access          Public Access
    Parameter       category
    Methods         GET methods
*/
booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});

    if(!getSpecificBook){
        return res.json({
            error: `No book found for category of ${req.params.category}`
        });
    }
    return res.json({getSpecificBook});    
});

// GET book based on language
/*
    Route           /d        
    Description     Get specific language  books
    Access          Public Access
    Parameter       language
    Methods         GET methods
*/
booky.get("/d/:language", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({language: req.params.language})
   
    if(!getSpecificBook){
        return res.json({
            error: `No book found for Language of ${req.params.language}`
        });
    }
    return res.json(getSpecificBook); 
});

/*------------------GET--------AUTHORS-------------------- */
// GET all AUTHORS
/*
    Route           /author     
    Description     Get all AUTHORS
    Access          Public Access
    Parameter       NONE
    Methods         GET methods
*/
booky.get("/author", async (req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// GET all AUTHORS based on a Book
/*
    Route           /author/book     
    Description     Get all AUTHORS based on book
    Access          Public Access
    Parameter       isbn
    Methods         GET methods
*/
booky.get("/author/book/:isbn", async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});

    if(!getSpecificAuthor){
        return res.json({
            error: `No Author found for isbn of ${req.params.isbn}`
        });
    }
    return res.json({authors: getSpecificAuthor});  	
});

// GET the list of AUTHORS based on books
/*
    Route           /bk       
    Description     Get specific authors
    Access          Public Access
    Parameter       book
    Methods         GET methods
*/
booky.get("/bk/:books", async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.books});

    if(!getSpecificAuthor){
        return res.json({
            error: `No author found for book of ${req.params.books}`
        });
    }
    return res.json({authors: getSpecificAuthor});    
});

/* --------------------GET--------PUBLICATIONS--------------- */
// GET all PUBLICATION
/*
    Route           /publications       
    Description     Get all PUBLICATIONS
    Access          Public Access
    Parameter       NONE
    Methods         GET methods
*/
booky.get("/publications", async (req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

// Get a specific PUBLICATION
/*
    Route           /pub/book      
    Description     Get specific PUBLICATION
    Access          Public Access
    Parameter       NONE
    Methods         GET methods
*/
booky.get("/publications/book/:isbn", async (req,res) => {
    const getSpecificPublications = await PublicationModel.findOne({publications: req.params.isbn});
  
    if(!getSpecificPublications){
        return res.json({
            error: `No publication found for ISBN of ${req.params.isbn}`
        });
    }
    return res.json({books: getSpecificPublications});
});

// GET a list of publications based on books
/*
Route           /pbs
Description     Get specific publications based on book
Access          Public access
Parameter       book
Methods         GET methods
*/
booky.get("/publications/:books", async (req,res) => {
    const getSpecificPublications = await PublicationModel.findOne({publication: req.params.books});
 
    if(!getSpecificPublications){
        return res.json({
            error: `No publication found for book of ${req.params.books}`
        });
    }
    return res.json({books: getSpecificPublications});    
});

// ----------------------------POST---------------------------//
// TO ADD new BOOKS
/*
Route           /book/new
Description     add new books
Access          Public
Parameter       NONE
Methods         POST
*/
booky.post("/book/new", async(req, res) => {
    const {newBook} = req.body;
    const addNewBook = BookModel.create(newBook)
    return res.json(
        {   
            books: addNewBook, 
            message: "Book was added!" 
        });
});

// TO ADD new Authors
/*
Route           /author/new
Description     add new author
Access          Public
Parameter       NONE
Methods         POST
*/
booky.post("/author/new", async(req,res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
        {
            Authors: addNewAuthor,
            message: "Authors was added"
        });

});

// TO ADD new PUBLICATION
/*
Route           /publications/new
Description     add new PUBLICATION
Access          Public
Parameter       NONE
Methods         POST
*/
booky.post("/publications/new", async(req, res) => {
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json(
        { 
            publication: addNewPublication, 
            message: "publication was added" 
        });
});
//--------------------------UPDATES------------------------//
//Update a book title
/*
Route           /book/update/:isbn
Description     Update book title
Access          Public
Parameter       isbn
Methods         PUT method
*/
booky.put("/book/update/:isbn", async(req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {ISBN: req.params.isbn},
        {title: req.body.bookTitle},
        {new: true} 
    );
    return res.json({books: updatedBook});
});

// Update publication and book
/*
Route           /publications/update/book/
Description     Update Publication and book
Access          Public
Parameter       isbn
Methods         PUT method
*/
booky.put("/publications/update/book/:isbn", async(req,res) =>{
    //Update pablication DB
    const updatePublication = await PublicationModel.findOneAndUpdate(
        {id: parseInt(req.body.id)},
        {$push: {books: req.params.isbn} },
        {new: true}
    );
    //Update BOOK DB
    const updateBook= await BookModel.findOneAndUpdate(
        {ISBN: req.params.isbn},
        {publications: req.body.id},
        {new: true}
    );
    return res.json(
        {
            books: updatePublication ,
            publications: updateBook,
            message: "Update are successfully DONE"}
      );
});
  // UPDATE Authors DB
booky.put("/authors/update/book/:isbn", async(req,res) =>{
    const updateAuthors= await AuthorModel.findOneAndUpdate(
        {ISBN: req.params.isbn},
        {authors: req.body.id},
        {new: true}
    );
    return res.json(
        {
            authors: updateAuthors,
            message: "Authors DB are Successfully Updated"}
      );
});

//---------------------------DELETE----------------------//
// DELETE A BOOK
/*
Route           /book/delete
Description     DELETE a book
Access          Public
Parameter       isbn
Methods         DELETE method
*/
booky.delete("/book/delete/:isbn", async(req,res) =>{
    const deleteBook= await BookModel.findOneAndDelete(
        {ISBN: req.params.isbn}
    );
    return res.json({books: deleteBook});
  });

// DELETE An author from a book viceversa
/*
Route           /book/delete/author
Description     DELETE an author from  book viceversa
Access          Public
Parameter       isbn,authorId
Methods         DELETE method
*/
booky.delete("/book/delete/author/:isbn/:authorId", async(req,res) =>{
    // DELETE Book
    const deleteBook= await BookModel.findOneAndDelete(
      {ISBN: req.params.isbn},
      {$pull : {author: parseInt(req.params.authorId)} },
    );
    // DELETE Author
    const deleteAuthor= await AuthorModel.findOneAndUpdate(
        {id: parseInt(req.params.authorId)},
        {$pull: {books: req.params.isbn} },
        {new: true }
      );
      return res.json({books: deleteBook, authors: deleteAuthor});
});   

// Delete publication
booky.delete("/publications/delete/:isbn", async(req,res) =>{
    const deletePublication = await PublicationModel.findOneAndDelete(
        {ISBN: req.params.isbn}
    );
    return res.json({dpublication: deletePublication});
  });


booky.listen(3000, () => console.log("Server is up and running")); //Listen for connection

