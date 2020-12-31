const express = require('express');
const bodyParser = require('body-parser');
const Queue = require('bull');
const uuidV4 = require('uuid').v4;

const jobQueue = new Queue('job');
const app = express();

jobQueue.process(5, (job, done) => {
  const { id, time } = job.data;
  setTimeout(() => {
    console.log('PID: ', process.pid);
    console.log('ID: ', id);
    console.log('Time:', time);
    done();
  }, 3000);
 });

app.use(bodyParser.json());

app.get('/jobs', (req, res, next) => {
  jobQueue.add({
    id: uuidV4(),
    time: Date.now(),
  });
  res.send('ok');
});

app.listen(3001, () => {
  console.log('Server started at port 3000');
});

