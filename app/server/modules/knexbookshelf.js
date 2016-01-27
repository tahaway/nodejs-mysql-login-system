exports = knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'quetta',
    charset  : 'utf8'
  }
});

exports = bookshelf = require('bookshelf')(knex);