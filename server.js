const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const notesDB = require('./db/db.json');

const PORT = process.env.PORT || 1337;

app.use(express.static("./Develop/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../note_taker_express/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});


app.get('/api/notes', async (req,res) => {

    try{
        await res.json(notesDB);
    }
    catch(error){
        console.error(error);
    }

});

app.post('/api/notes', async (req,res) => {
    try{
        let newNotesObj = req.body;
        await notesDB.push(req.body);
        await res.json(notesDB);
        await console.log(notesDB);
        await fs.writeFile('./db/db.json', JSON.stringify(notesDB) , err => {if (err)
             { return console.log(err)}
            }); 
    }
    catch(error){
        console.log(error);
    }
})


/// listens when server is on and logs a confirmation message
app.listen(PORT, () => {
    console.log(`Server is live!`);
});
