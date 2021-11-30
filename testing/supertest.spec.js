const request = require('supertest');
const app = require('../../server/index.js').app;

// jest.setTimeout(10000);

describe('GET /reviews', function() {
  it('should respond with reviews data', (done) => {
    request(app)
      .get('/api/reviews?product_id=999999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.product).toBe(999999);
        expect(res.body.results.review_id).toBeTruthy;
      })
      .then(() => {done()})
      .catch(err => {done(err)})

      // expect(res.status).toBe(200);
      // expect(res.body.data.product).toBe(999999);
      // .end((res, err) => {
      //   console.log('last step');
      //   console.log('response:', res.status);
      //   if (res) {
      //     expect(res.status).toBe(200);
      //     expect(res.body.data.product).toBe(999999);
      //     expect(res.body.data.results.review_id).toBeTruthy();
      //   }
      //   res.body.data.product.should.equal(id);
      //   res.body.data.results.should.have.property("review_id");
      //   done();
      // });
  });
});

describe('GET /reviews/meta', function() {
  it('should respond with meta reviews data', (done) => {
    request(app)
      .get('/api/reviews/meta?product_id=999999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.product_id).toBe(999999);
        expect(res.body.ratings).toBeTruthy;
        expect(res.body.recommended).toBeTruthy;
        expect(res.body.characteristics).toBeTruthy;
      })
      .then(() => {done()})
      .catch(err => {done(err)})

  });
});

describe('POST /reviews/', function() {
  let data = {
    "product_id": 1,
    "characteristics":{
        "1": 2,
        "2": 4,
        "3": 5,
        "4": 3
    },
    "rating": 2,
    "summary": "wwwwwawawI'm going to NOLA",
    "body": "sdfasdfawefijawoiejfoiawjeoijfoa\"\"\"ijwegaowijegoijijoawijeofijaowie%$#@!aoijaw'slijoiejgoioiawjegoaasdfwerwetwet",
    "recommend": false,
    "name":"wer101929egw",
    "email":"asdfsdi@gmail.com",
    "photos":["http://placecorgi.com/380"]
  };

  it('should post a new review', (done) => {
    request(app)
      .post('/api/reviews')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
    });
  });
});

describe('PUT /reviews/:id/helpful', function() {
  it('should be able to vote for a helpful review', (done) => {
    request(app)
      .put('/api/reviews/989898/helpful')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.helpfulness).toBeTruthy;
      })
      .then(() => {done()})
      .catch(err => {done(err)})
  });
});

describe('PUT /reviews/:id/report', function() {
  it('should be able to report a review', (done) => {
    request(app)
      .put('/api/reviews/989898/report')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.reported).toBe(true);
      })
      .then(() => {done()})
      .catch(err => {done(err)})
  });
});