const db = require('../db');

// Get reviews for a product
const getReviews = (params, callback) => {
  let product = params.product_id;
  let page = params.page || 1;
  let count = params.count || 5;
  let start = count * (page - 1) + 1;
  let end = start + count - 1;

  let sortBy;
  if (params.sort === 'newest') {
    sortBy = 'date';
  } else if (params.sort === 'helpful') {
    sortBy = 'helpfullness';
  } else {
    sortBy = 'date';
  }

  let qString = `
    with query_product as (
      select *,
      row_number() over (partition by product_id order by ${sortBy}) as rn
      from reviews
      where product_id = ${product}
    ), query_product_limit as (
      select *
      from query_product
      where rn >= ${start} and rn <= ${end}
    ), photos as (
      select * from reviews_photos
      where review_id in (select id from query_product_limit)
    ), agg_photos as (
      select review_id,
      json_agg(
        json_build_object(
          'id', id,
          'url', url
        )
      ) as photos
      from photos
      group by review_id
    ), reviews_w_photos as (
      select a.*, b.photos
      from query_product_limit a
      left join agg_photos b
      on a.id = b.review_id
    )
    select
    product_id as product,
    1 as page,
    5 as count,
    json_agg(
      json_build_object(
        'review_id', id,
        'rating', rating,
        'summary', summary,
        'recommend', recommend,
        'response', response,
        'body', body,
        'date', date,
        'reviewer_name', reviewer_name,
        'helpfulness', helpfullness,
        'photos', photos
      )
    ) as results

    from

    reviews_w_photos
    group by product_id

    `;


  console.log('query string:', qString);
  db.query(qString, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows[0])
    }
  });

}

module.exports.getReviews = getReviews;