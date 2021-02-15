/*
 Authors:
 Your name and student #: Aaron Ma A00941215
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const { text } = require("express");
const express = require("express");
const fs = require('fs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


//movie array
let movies = ['Spiderman','Tenet','Gladiator','Inception'];

app.get("/", (req, res) => {
  res.render("pages/index",{
    moviesVariable: movies
  });
});

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here \
  let data = req.body.movie;
  movies = data.split(',');
  // if there was data in the text box then render index with the movies
  if (movies){
    res.render('pages/index.ejs',{
      moviesVariable: movies
    })
  }
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  // the two movies = movie1 and movie2 in the url query
  let movie_query = [req.query.movie1,req.query.movie2];
  // if there are movies then render the index page with just the two movies
  if (movie_query.length == 2){
    res.render('pages/index.ejs',{
      moviesVariable: movie_query
    })
  }
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  fs.readFile('movieDescriptions.txt',(err,data)=>{
    let movieName = req.params.movieName;
    if (err){
      return console.log('error, no text file to read');
    }
    if (data){
      let movieDesc = ''
      // turn the data into an array of lines
      movie_txt = data.toString().split('\n');
      // search the strings for the movieName param
      movie_txt.forEach((movie)=>{
        theMovie = movie.split(':');
        // if found, then make the movieDesc the one in the txt file
        if (theMovie[0].toLowerCase() === movieName ){
          movieDesc = theMovie[1];
        }
      })
      // if the description was found, then render the found page
      if (movieDesc != ''){
        res.render('pages/searchResult.ejs',{
          movieName: movieName,
          movieDesc: movieDesc
        })
      } else{ // description not found, render not found page
        error = `Description for ${movieName} was not found.`;
        res.render('pages/searchResult.ejs',{
          msg: error,
          movieDesc: movieDesc
        })
      }
    }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});
