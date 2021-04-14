const express = require ('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
})