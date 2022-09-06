'use strict';
const dotenv = require('dotenv')
dotenv.config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose'); //import


const app = express();
app.use(cors());
// ///////////////////////////////////////////////access req.body//////////////////////////////////////////////////

app.use(express.json());

// ///////////////////////////////////////////////access req.body//////////////////////////////////////////////////

// ///////////////////////////////////////////////PORT//////////////////////////////////////////////////

const PORT = process.env.PORT || 3001;

// ///////////////////////////////////////////////PORT//////////////////////////////////////////////////

// ///////////////////////////////////////////////mongooseDB//////////////////////////////////////////////////

// connect mongoose with DB

mongoose.connect('mongodb://omar:1234@ac-gz7wr2i-shard-00-00.jeyohs9.mongodb.net:27017,ac-gz7wr2i-shard-00-01.jeyohs9.mongodb.net:27017,ac-gz7wr2i-shard-00-02.jeyohs9.mongodb.net:27017/?ssl=true&replicaSet=atlas-z04wln-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// connect mongoose with DB


const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String

});

const bookModel = mongoose.model('book', BookSchema);
// /////////////////////////////////////////////////////////////////////////////////////////////////////////


// ///////////////////////////////////////////////rautes//////////////////////////////////////////////////


app.get('/test', (request, response) => {

  response.send('test request received');
});

app.get('/books', getbookHandler);
app.post('/books', bookHandler);
app.delete('/books/:id', deleteBooksHandler);
app.put('/books/:id', dupdateBooksHandler);



// /////////////////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////The Function////////////////////////////////////////////////////////



//seed data
async function seedData() {
  const firstBook = new bookModel({
    title: "firstBook",
    description: "firstBook description",
    status: "firstBook status"
  });

  const secondtBook = new bookModel({
    title: "secondtBook",
    description: "secondtBook description",
    status: "secondtBook status"
  });

  const theardtBook = new bookModel({
    title: "theardtBook",
    description: "theardtBook description",
    status: "theardtBook status"
  });


  await firstBook.save();
  await secondtBook.save();
  await theardtBook.save();
  console.log('done');

}

// seedData();


function getbookHandler(req, res) {
  bookModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(result);
    }
  });
}


async function bookHandler(req, res) {
  // console.log(req.body);
  const { BookTitle, BookDescription, BookStatus } = req.body;
  await bookModel.create({
    title: BookTitle,
    description: BookDescription,
    status: BookStatus
  });

  bookModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(result);
    }
  });
}



function deleteBooksHandler(req, res) {
  const bookId = req.params.id;
  bookModel.deleteOne({ _id: bookId }, (err, result) => {

    bookModel.find({}, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.json(result);
      }
    });
  });
}

function dupdateBooksHandler(req, res) {
  console.log(req.body);
  const id = req.params.id;
  console.log(id);

  const { title, description, status  } = req.body;
  bookModel.findByIdAndUpdate(id,{ title, description, status },(err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else
    {
      bookModel.find({}, (err, result) => {
        if (err) {
          console.log(err);
        }
        else {
          res.json(result);
        }
      });

    }
  });
}

// /////////////////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`listening on ${PORT}`));
// /////////////////////////////////////////////////////////////////////////////////////////////////
