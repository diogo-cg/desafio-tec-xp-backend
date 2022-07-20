import express from 'express';
import routers from './routes/index';
import httpErrorMiddleware from './middleware/http.erro.middleware';

require('express-async-errors');

const app = express();

app.use(express.json());
app.use(routers);
app.use(httpErrorMiddleware);

export default app;
