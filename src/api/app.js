const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openApiSwaggerDoc = require('../services/openAPI/openApiSwaggerDoc.json');
const router = require('../routes/router');
const mdw = require('../middlewares');
const startUpServices = require('../services/startUpServices');

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSwaggerDoc));
app.use(mdw.mdwError.errorMiddleware);

startUpServices.seedDataBaseRoutine();

module.exports = app;
