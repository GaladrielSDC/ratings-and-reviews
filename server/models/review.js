const db = require('../db');

const postReview = (params, callback) => {
  let values = [
    params.product_id,
    params.rating,
    params.summary,
    params.body,
    params.recommend,
    params.name,
    params.email
  ];

  let qStringReviews = `
    insert into reviews (
      id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfullness
    ) values (
      (select max(id) from reviews) + 1, $1, $2, current_timestamp, $3, $4, $5, false, $6, $7, null, 0
    )
    returning id
  `;

  console.log(qStringReviews);
  db.query(qStringReviews, values, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows[0])
    }
  });

  // db.query(qStringReviews, (err, res) => {
  //   if (err) {
  //     callback(err, null);
  //   } else {
  //     let reviewId = res.rows[0];
  //     if (params.photos) {
  //       let nPhotos = params.photos.length;
  //       for (var i = 0; i < nPhotos; i++) {

  //       }
  //     }
  //   }
  // })

  // let qStringPhotos = `
  //   insert into reviews_photos (
  //     id, review_id, url
  //   ) values (
  //     (select max(id) from reviews_photos) + 1, ${reviewId}, ${url}
  //   )
  // `;

  // let qStringChars = `
  //     insert into reviews_characteristics (
  //       id, characteristic_id, review_id, value
  //     ) values (
  //       (select max(id) from reviews_characteristics) + 1, ${charId}, ${reviewId}, ${charValue}
  //     )
  // `

}

module.exports.postReview = postReview;