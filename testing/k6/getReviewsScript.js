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
      rate: 500, // 200 RPS, since timeUnit is the default 1s
      preAllocatedVUs: 500,
      duration: '10s',
      maxVUs: 1000
    },
  },
};


export default function () {
  let randomId = Math.floor(Math.random() * 100000)
  const res = http.get(`http://localhost:8000/api/reviews?product_id=${randomId}`);
}

// export const options = {
//   vus: 100,
//   duration: '30s'
// }
// export default function () {
//   let id = Math.floor(Math.random() * 1000000);
//   http.get('http://localhost:3000/api/reviews?product_id=' + id);
//   sleep(1);
// }