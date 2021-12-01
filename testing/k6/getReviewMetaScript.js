import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // //Running a 15-second, 10-virtual user load test
  // vus: 50,    // virtual user
  // duration: '30s',
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 800, // 200 RPS, since timeUnit is the default 1s
      preAllocatedVUs: 800,
      duration: '30s'
      // maxVUs: 10000,
    },
  },
};


export default function () {
  let randomId = Math.floor(Math.random() * 100000)
  const res = http.get(`http://localhost:8000/api/reviews/meta?product_id=${randomId}`);
}