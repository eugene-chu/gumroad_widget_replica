const express = require ('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3030, () => {
  console.log('Server listening at port 3030');
})