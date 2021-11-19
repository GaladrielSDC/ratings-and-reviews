const models = require('../models');

const get = (req, res) => {
  const productId = req.query.product_id;
  if (typeof parseInt(productId) === 'number') {
    let params = req.query;
    models.getReviews(params, (err, result) => {
      if (err) {
        res.status(500).send(`Error getting reviews for product ${productId}: `, err);

      } else {
        // console.log('what is params', params);
        res.status(200).send(result);
      }
    })
  } else {
    res.status(400).send('Invalid product id');
  }
}

module.exports.get = get;