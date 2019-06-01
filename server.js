const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/', (request, response) => {
    response.send('hello');
});

app.listen(3002, () => {
    console.log('server running on 3002');
});

