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

module.exports.post = post;