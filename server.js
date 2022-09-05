
'use strict';
const dotenv = require('dotenv')
dotenv.config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose'); //import


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;



mongoose.connect('mongodb://localhost:27017/Book', { useNewUrlParser: true, useUnifiedTopology: true }); // 1 - connect mongoose with DB


const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String

});

const bookModel = mongoose.model('book', BookSchema);




//seed data
async function seedData() {
  const firstBook = new bookModel({
    title: "firstBook",
    description: "firstBook description",
    status: "firstBook status"
  })

  const secondtBook = new bookModel({
    title: "secondtBook",
    description: "secondtBook description",
    status: "secondtBook status"
  })

  const theardtBook = new bookModel({
    title: "theardtBook",
    description: "theardtBook description",
    status: "theardtBook status"
  })


  await firstBook.save();
  await secondtBook.save();
  await theardtBook.save();

}

// seedData();


app.get('/test', (request, response) => {

  response.send('test request received')
})


app.get('/books', getbookHandler);

function getbookHandler(req, res) {
  bookModel.find({}, (err, result) => {
    if(err) {
      console.log(err);
    }
    else
    {
      console.log(result);
      res.json(result);
    }
  })
}









app.listen(PORT, () => console.log(`listening on ${PORT}`));
