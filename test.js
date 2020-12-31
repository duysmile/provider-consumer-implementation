const axios = require('axios');

let count = 20;

while(count--) {
  axios.get('http://localhost:3000/jobs');
}

