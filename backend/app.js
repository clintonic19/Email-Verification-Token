const express = require('express');
const dotenv = require('dotenv');


const  connectDB  = require('./dbConfig/db');
const authRoutes = require('./routes/authRoute');

//Load env variables
dotenv.config();

//Init express
const app = express();

//DB Connection
connectDB();

//PORT
const PORT = process.env.PORT || 5001;

//JSON Middleware
app.use(express.json()); //

//Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Add error handling for the server
// server.on('error', (err) => {
//     if (err.code === 'EACCES') {
//         console.error(`Permission denied on port ${PORT}. Try running with elevated privileges or using a different port.`);
//         process.exit(1);
//     } else if (err.code === 'EADDRINUSE') {
//         console.error(`Port ${PORT} is already in use. Choose a different port.`);
//         process.exit(1);
//     } else {
//         console.error('Unhandled server error:', err);
//         process.exit(1);
//     }
// });

// process.on('uncaughtException', (err) => {
//     console.error('Unhandled exception:', err);
//     process.exit(1);
// });

// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled rejection at:', promise, 'reason:', reason);
//     process.exit(1);
// });

