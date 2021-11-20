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

// let qString = `
//     with query_product as (
//       select *,
//       row_number() over (partition by product_id order by date) as rn
//       from reviews
//       where product_id = 4
//     ), query_product_limit as (
//       select *
//       from query_product
//       where rn >= 1 and rn <= 5
//     ), photos as (
//       select * from reviews_photos
//       where review_id in (select id from query_product_limit)
//     ), agg_photos as (
//       select review_id,
//       json_agg(
//         json_build_object(
//           'id', id,
//           'url', url
//         )
//       ) as photos
//       from photos
//       group by review_id
//     ), reviews_w_photos as (
//       select a.*, b.photos
//       from query_product_limit a
//       left join agg_photos b
//       on a.id = b.review_id
//     )
//     select
//     product_id as product,
//     1 as page,
//     5 as count,
//     json_agg(
//       json_build_object(
//         'review_id', id,
//         'rating', rating,
//         'summary', summary,
//         'recommend', recommend,
//         'response', response,
//         'body', body,
//         'date', date,
//         'reviewer_name', reviewer_name,
//         'helpfulness', helpfulness,
//         'photos', photos
//       )
//     ) as results

//     from

//     reviews_w_photos
//     group by product_id

//     `;

// pool
//   .query(qString)
//   .then(res => {
//     console.log('this is the data returned:', res.rows[0])
//   })
//   .catch(err => console.error(err))

module.exports = pool;
