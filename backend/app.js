const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

//Local Imports
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
const _dirname = path.resolve();

//CORS
app.use(cors({ 
    origin: "http://localhost:5173", 
    credentials: true // enable set cookie
    }));

//JSON Middleware
app.use(express.json()); //Parse incoming request with : req.body
app.use(cookieParser()); //Parse incoming cookies request with : req.cookies

//Routes
app.use('/api/auth', authRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join( _dirname, "/frontend/dist/")));

    app.get("*", (req, res) => {
		res.sendFile(path.resolve( _dirname, "frontend", "dist", "index.html"));
	});
};

//Server
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

