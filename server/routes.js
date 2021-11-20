const router = require('express').Router();
const controller = require('./controllers');

// GET reviews
router.get('/', controller.reviews.get);

// GET review meta
router.get('/meta', controller.metareview.get);

// POST new review
router.post('/', controller.review.post);

// PUT mark review as helpful
router.put('/:review_id/helpful', controller.review.vote);

// PUT report review
router.put('/:review_id/report', controller.review.report);

module.exports = router;