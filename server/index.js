const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');
const massive = require('massive');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(error => console.log('massive error',error))

app.get('/api/houses',controller.read);
app.post('/api/houses',controller.create);
app.put('/api/houses/:id',controller.update);
app.delete('/api/houses/:id',controller.delete);

const PORT = 4000;
app.listen(PORT, ()=> console.log('server now listening to port ' + PORT));

