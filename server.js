import express from 'express';
import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';
import { initDb } from './database.js';
import { hashPassword, checkMatch } from 'auth/auth.js';

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
        cookie: { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 },
    })
);

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

app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.send('Invalid email or password');
    }

    db.get('SELECT * FROM users WHERE email = ?', req.body.email, async (err, user) => {
        if (err) {
            res.send('An error occurred');
        }

        if (!user) {
            res.send('User not found');
        }

        if (await checkMatch(req.body.password, user.passwordHash)) {
            req.session.user = {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email};
            res.send('User is logged in');
        } else {
            res.send('Invalid email or password');
        }
    });
});

app.post('/register', (req, res) => {
    // we check to make sure the user details are valid
    if (!req.body.email || !req.body.password) {
        res.send('Invalid email or password');
    }

    // we hash the password
    const passwordHash = hashPassword(req.body.password);

    db.run('INSERT INTO users (email, passwordHash) VALUES (?, ?)', req.body.email, passwordHash, (err) => {
        if (err) {
            res.send('An error occurred');
        }

        res.send('User registered');
    });

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