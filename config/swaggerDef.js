const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
	info: {
		title: 'Rankit API',
		version: '1.0.0',
		description: 'REST API for the Rankit Application'
	}
};

const swaggerOptions = {
	swaggerDefinition,
	apis: ['./routes/api/*.js', './models/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
