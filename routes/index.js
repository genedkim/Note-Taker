const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const getNotes = () => {
    return readFromFile('db/db.json', 'utf-8').then(rawNotes => [].concat(JSON.parse(rawNotes)))
}

router.get('/notes', (req, res) => {
    getNotes().then(notes => res.json(notes)).catch(err => res.json(err))
})

router.post('/notes', (req, res) => {
    getNotes().then(oldNotes => {
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Math.floor(Math.random() * 1000)
        }
        let newNoteArr = [...oldNotes, newNote]
        writeToFile('db/db.json', JSON.stringify(newNoteArr)).then(() => res.json({msg: 'OK!'})).catch(err => res.json(err));
    })
})

router.delete('/notes/:id', (req, res) => {
    getNotes().then(oldNotes => {
        let filteredNotes = oldNotes.filter(note => note.id != req.params.id)
        console.log(filteredNotes)
        writeToFile('db/db.json', JSON.stringify(filteredNotes)).then(() => res.json({msg: 'OK!'})).catch(err => res.json(err));
    })
})

module.exports = router;

