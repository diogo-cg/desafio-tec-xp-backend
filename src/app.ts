import express from 'express';
import routers from '../routes';

require('express-async-errors');

const app = express();

app.use(express.json());
app.use(routers);

export default app;
