const app = require('./app');

const PORT = process.env.PORT || 3002;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Listening: http://${HOST}:${PORT}`);
});