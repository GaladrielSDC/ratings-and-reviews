import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '30s'
}
export default function () {
  let id = Math.floor(Math.random() * 1000000);
  http.get('http://localhost:3000/api/reviews?product_id=' + id);
  sleep(1);
}