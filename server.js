const express = require('express');
const connectDB = require('./config/db');
const avatarsMiddleware = require('adorable-avatars');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./config/swaggerDef');
const http = require('http');
const socketIO = require('socket.io');

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

// Swagger documentation setup - available under 'localhost:5000/api-docs':
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDoc, { explorer: true })
);

// Define default port
const PORT = process.env.PORT || 5000;

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
	console.log('User connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
