import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.post('/login', (req, res) => {
    // we check to make sure the user details are valid
    res.send('User is logged in');
});

app.post('/register', (req, res) => {
    // we check to make sure the user details are valid
    res.send('User is registered');
});

app.post('/signout', (req, res) => {
    // we sign out the user
    res.send('User is signed out');
});

app.get('/user', (req, res) => {
    // we get the user details based on the user requesting it
    res.send('User details');
});

app.post('/analysis', (req, res) => {
    // this route is a stand-in for the raspberry pi receiving and processing the data
    res.send('Analysis complete');
})

app.get('/analysisHistory', (req, res) => {
    // this just returns the user's past analysis results
    res.send('Analysis history');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});