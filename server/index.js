const express = require ('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3030, () => {
  console.log('Server listening at port 3030');
})