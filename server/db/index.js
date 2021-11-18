const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'yina',
  host: 'localhost',
  database: 'atelier_reviews',
  password: '',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to db atelier_reviews: ', err);
  } else {
    console.log('Connected to db atelier_reviews!');
  }
});

// pool
//   .query('select * from reviews limit 2')
//   .then(res => {
//     console.log('this is the data returned:', typeof res)
//   })
//   .catch(err => console.error(err))

module.exports = pool;
