const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));

// app.get('/', (req, res) => {
// 	res.render('index');
// });

app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(9000, () => {
	console.info('Running');
});
