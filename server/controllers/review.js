const models = require('../models');

const post = (req, res) => {
  let params = req.body;
  models.postReview(params, (err, result) => {
    if (err) {
      res.status(500).send(`Cannot save new review for product ${params.product_id}. Error message ${err}.`);
    } else {
      res.status(201).send(result);
    }
  })
}

const vote = (req, res) => {
  let reviewId = req.params.review_id;
  models.updateReview(reviewId, 'helpfulness', (err, result) => {
    if (err) {
      res.status(500).send(`Error voting for review with id ${reviewId}. Error message: ${err}`);
    } else {
      res.status(200).json(result);
    }
  })
}

const report = (req, res) => {
  let reviewId = req.params.review_id;
  models.updateReview(reviewId, 'report', (err, result) => {
    if (err) {
      res.status(500).send(`Error report review with id ${reviewId}. Error message: ${err}`);
    } else {
      res.status(200).json(result);
    }
  })
}


module.exports.post = post;
module.exports.vote = vote;
module.exports.report = report;