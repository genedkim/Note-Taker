const express = require('express');
const { readAndAppend } = require('../../UW-VIRT-FSF-PT-10-2022-U-LOLC-main/11-Express/01-Activities/28-Stu_Mini-Project/Main/helpers/fsUtils');
const database = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
})
