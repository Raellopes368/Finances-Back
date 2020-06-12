require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');
const { port } = require('./configs/server');

const user = process.env.USER;
const pass = process.env.PASS;


mongoose.connect(
  `mongodb+srv://${user}:${pass}@cluster0-8qmbp.mongodb.net/finances?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: 'instead',
    useFindAndModify: false,
  },
);

server.listen(port, () => console.log(`Server running on port ${port}`));
