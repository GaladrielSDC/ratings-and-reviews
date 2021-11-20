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
      id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness
    ) values (
      (select max(id) from reviews) + 1, $1, $2, current_timestamp, $3, $4, $5, false, $6, $7, null, 0
    )
    returning id
  `;

  let chars = params.characteristics;

  async function postQuery() {
    try {
      const postReviewsResult = await db.query(qStringReviews, values);
      const reviewId = postReviewsResult.rows[0].id;
      for (var key in chars) {
        let qValueChars = [key, reviewId, chars[key]];
        let qStringChars = `
          insert into reviews_characteristics (
            id, characteristic_id, review_id, value
          ) values (
            (select max(id) from reviews_characteristics) + 1, $1, $2, $3
          )
        `;
        await db.query(qStringChars, qValueChars);
      }

      if (params.photos && params.photos.length > 0) {
        let photos = params.photos;
        let nPhotos = photos.length;
        for (var i = 0; i < nPhotos; i++) {
          let qValuePhotos = [reviewId, photos[i]];
          let qStringPhotos = `
            insert into reviews_photos (
              id, review_id, url
            ) values (
              (select max(id) from reviews_photos) + 1, $1, $2
            )
          `;
          await db.query(qStringPhotos, qValuePhotos);
        }
      }

      callback(null, postReviewsResult.rows[0]);

    } catch (err) {
      callback(err, null);
    }
  }
  postQuery();

}

const updateReview = (id, field, callback) => {
  let qString;
  if (field == 'helpfulness') {
    qString = `
      update reviews set helpfulness = helpfulness + 1 where id = ${id} returning helpfulness
    `
  }

  if (field == 'report') {
    qString = `
      update reviews set reported = true where id = ${id} returning reported
    `
  }

  // console.log('query string:', qString);

  db.query(qString, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.rows[0])
    }
  })
}

module.exports.postReview = postReview;
module.exports.updateReview = updateReview;