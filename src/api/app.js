const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openApiSwaggerDocLocal = require('../services/openAPI/openApiSwaggerDocLocal.json');
const openApiSwaggerDocDevelopment = require('../services/openAPI/openApiSwaggerDocDevelopment.json');
const router = require('../routes/router');
const mdw = require('../middlewares');
const startUpServices = require('../services/startUpServices');

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use('/local-api-docs', swaggerUi.serve, swaggerUi.setup(openApiSwaggerDocLocal));
app.use('/dev-api-docs', swaggerUi.serve, swaggerUi.setup(openApiSwaggerDocDevelopment));
app.use(mdw.mdwError.errorMiddleware);

startUpServices.seedDataBaseRoutine();

module.exports = app;
