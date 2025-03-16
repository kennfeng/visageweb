import express from 'express';
import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';
import { initDb } from './database.js';
import { hashPassword } from './auth/auth.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
const app = express();
const SQLiteStoreInstance = SQLiteStore(session);


app.use(express.json());

app.use(
    session({
        store: new SQLiteStoreInstance({
            db: 'sessions.sqlite',
            dir: './',
        }),
        secret: 'shouldbeinenv',
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: false, // For development
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax'
        },
    })
);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

// we run initDB to create the database and tables
initDb();

const db = await initDb();

//test the database by showing all the users
const users = await db.all('SELECT * FROM users');
console.log(`There are ${users.length} users in the database`);

/** This is just some middleware to check if the user is authenticated or not! */
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.send('User is not authenticated');
    }
}

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Use promise-based query
        const row = await db.get(
            'SELECT id, email, firstName, lastName, passwordHash FROM users WHERE email = ?', 
            [req.body.email]
        );

        if (!row) {
            console.log('No user found');
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, row.passwordHash);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const userData = {
            id: row.id,
            email: row.email,
            firstName: row.firstName,
            lastName: row.lastName
        };

        req.session.user = userData;
        
        return res.status(200).json({
            success: true,
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
// app.post('/login', async (req, res) => {
//     console.log("logging in", req.body);
//     if (!req.body.email || !req.body.password) {
//         return res.status(400).send('Invalid email or password');
//     }

//     console.log("getting user1");
//     db.get('SELECT * FROM users WHERE email = ?', [req.body.email], async (err, row) => {
//         console.log("getting user2");
//         if (err) {
//             return res.status(500).send('Database error');
//         }

//         console.log("row");
//         if (!row) {
//             return res.status(401).send('Invalid credentials');
//         }

//         console.log("row1");
//         req.session.user = { id: row.id, email: row.email };
//         return res.send('User logged in');
//     });
// });

app.post('/register', async (req, res) => {
    try {
        // Check if all required fields are present
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await db.get('SELECT email FROM users WHERE email = ?', [req.body.email]);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const passwordHash = await hashPassword(req.body.password);

        // Insert new user
        const result = await db.run(
            'INSERT INTO users (firstName, lastName, email, passwordHash) VALUES (?, ?, ?, ?)',
            [req.body.firstName, req.body.lastName, req.body.email, passwordHash]
        );

        // Get the newly created user
        const newUser = await db.get('SELECT id, email, firstName, lastName FROM users WHERE id = ?', [result.lastID]);

        // Send success response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

app.post('/signout', isAuthenticated, (req, res) => {
    // we sign out the user
    req.session.destroy((err) => {
        if (err) {
            res.send('An error occurred');
        }
        res.send('User is signed out');
    });
});

app.get('/user', isAuthenticated, (req, res) => {
    // we get the user details based on the user requesting it
    res.send('User details');
});



app.post('/analysis', isAuthenticated, (req, res) => {
    // this route is a stand-in for the raspberry pi receiving and processing the data
    res.send('Analysis complete');
})

app.get('/analysisHistory', isAuthenticated, (req, res) => {
    // this just returns the user's past analysis results
    res.send('Analysis history');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
