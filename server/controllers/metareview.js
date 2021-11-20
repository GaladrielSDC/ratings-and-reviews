const models = require('../models');

const get = (req, res) => {
  const productId = req.query.product_id;
  if (typeof parseInt(productId) === 'number') {
    let params = req.query;
    models.getMetareview(params, (err, result) => {
      if (err) {
        res.status(500).send(`Error getting meta review for product ${productId}: `, err);

      } else {
        res.status(200).json(result);
      }
    })
  } else {
    res.status(400).send('Invalid product id');
  }
}

module.exports.get = get;