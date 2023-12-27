const express = require("express");
const db = require("./data/db.json");
const app = express();
const PORT = 3000;
const fs = require('fs');

// Middleware
app.use(express.urlencoded({extended: false}));

// REST API
app.get('/api/data', (req, res) => {
    return res.json(db)
})

app.get('/api/data/:id', (req, res) => {
    const id = Number(req.params.id);
    // Find ID in db
    const findID = db.find((findID) => findID.id === id);
    return res.json(findID)
})

app.post('/api/data', (req, res) =>{
    const body = req.body;
    db.push({...body, id: Date.now()});
    fs.writeFile('./data/db.json', JSON.stringify(db), (err, data) => {
        return res.json({status: "Successfully Inserted"});
    })
})

app.delete('/api/data/:id', (req, res) =>{
    const id = Number(req.params.id);
    // Find ID in db
    const findID = db.find((findID) => findID.id === id);
    //console.log(findID);
    const objIndex = db.indexOf(findID);
    //console.log(objIndex);
    db.splice(objIndex,1)
    return res.json({status: "Successfully deleted"});
})

app.listen(PORT, () => console.log('Server started at PORT 8000'));
