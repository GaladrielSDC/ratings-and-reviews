const models = require('../models');

const get = (req, res) => {
  if (req.query.product_id == null) {
    res.status(400).send('Invalid product id');
  }

  const productId = req.query.product_id;
  if (typeof parseInt(productId) === 'number') {
    let params = req.query;
    models.getReviews(params, (err, result) => {
      if (err) {
        res.status(500).send(`Error getting reviews for product ${productId}: `, err);

      } else if (result && result.results) {
        // console.log('what is params', params);
        let nReviews = result.results.length;
        for (var i = 0; i < nReviews; i++) {
          if (!result.results[i].photos) {
            result.results[i].photos = [];
          }
          if (result.results[i].response === 'null') {
            result.results[i].response = null;
          }
        }
        res.status(200).send(result);
      }
    })
  } else {
    res.status(400).send('Invalid product id');
  }
}

module.exports.get = get;