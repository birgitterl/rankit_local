const express = require('express');
const connectDB = require('./config/db');
const avatarsMiddleware = require('adorable-avatars');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./config/swaggerDef');

// Initialize express
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Init Middleware adorable avatars
app.use('/myAvatars', avatarsMiddleware);

app.get('/', (req, res) => res.send('API Running'));

// Define middleware:
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Swagger documentation setup - available under 'localhost:5000/api-docs':
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDoc, { explorer: true })
);

// Define default port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
