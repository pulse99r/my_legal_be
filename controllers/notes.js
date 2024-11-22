const express = require('express')
const notes = express.Router();
const db = require('../db/dbConfig.js')

// * * * *    INDEX: GET ALL NOTES    * * * *
notes.get('/',async (req, res)=>{
  try {
    const myNotes = await db.any('SELECT * FROM my_notes WHERE log_parent is null');
    if(myNotes){
      res.status(200).json(myNotes)
    } else {
      throw 'No notes records were found!'
    }
  } catch (error) {
    res.status(404).json({'error': error})
  }
});
// * * * *    SHOW: GET ONE NOTE    * * * *
notes.get('/:id',async (req, res)=>{
  
  try {
    const {id} = req.params;
    const myNote = await db.one('SELECT * FROM my_notes WHERE id = $1', [Number(id)]);
    if(myNote){
      res.status(200).json(myNote)
    } else {
      throw 'No notes records were found!'
    }
  } catch (error) {
    res.status(404).json({'error': error})
  }
});

// INDEX: list comments related to one my_note.id
notes.get('/:id/:comments/', async (req, res)=>{
  try {
    const {id, comments} = req.params
    const myNote = await db.any(
      'SELECT id, log_parent, log_entry FROM my_notes WHERE log_parent = $1',[Number(id)]);
    if(myNote){
      res.status(200).json(myNote)
    } else {
      throw 'No notes records were found!'
    }
  } catch (error) {
    res.status(404).json({error: error})
  }

})



// * * * *    CREATE: POST A NEW NOTE    * * * *
notes.post('/',async (req, res)=>{

  try {
    const {log_date, log_entry, log_parent, create_dt} = req.body
    if(log_date && log_entry && create_dt){
      const newNote = await db.one('INSERT INTO my_notes (log_date, log_entry, log_parent, create_dt) VALUES ($1, $2, $3, $4) RETURNING *', [log_date, log_entry, log_parent, create_dt]);
      res.status(200).json(newNote)
    } else {
      throw 'could not create a new note!'
    }
  } catch (error) {
    res.status(404).json({error: error})
  }
});

module.exports = notes;