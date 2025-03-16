import express from 'express';
import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';
import { initDb } from './database.js';
import { hashPassword, checkMatch } from './auth/auth.js';

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
    if (!req.body.firstName  || !req.body.lastName || !req.body.email || !req.body.password) {
        res.send('Missing user details');
    }

    // we hash the password
    const passwordHash = hashPassword(req.body.password);

    db.run('INSERT INTO users (firstName, lastName, email, passwordHash) VALUES (?, ?, ?, ?)', [req.body.firstName, req.body.lastName, req.body.email, passwordHash], (err) => {
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

app.get('/facialanalysis', (req, res) => {
    // we use camera info + mediapipe to analyze user's face

    // Demo 2: Continuously grab image from webcam stream and detect it.

    const video = document.getElementById("webcam");
    const canvasElement = document.getElementById(
    "output_canvas"
    );

    const canvasCtx = canvasElement.getContext("2d");

    // Check if webcam access is supported.
    function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // If webcam supported, add event listener to button for when user
    // wants to activate it.
    if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById(
        "webcamButton"
    );
    enableWebcamButton.addEventListener("click", enableCam);
    } else {
    console.warn("getUserMedia() is not supported by your browser");
    }

    // Enable the live webcam view and start detection.
    function enableCam(event) {
    if (!faceLandmarker) {
        console.log("Wait! faceLandmarker not loaded yet.");
        return;
    }

    if (webcamRunning === true) {
        webcamRunning = false;
        enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    } else {
        webcamRunning = true;
        enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }

    // getUsermedia parameters.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    });
    }

    let lastVideoTime = -1;
    let results = undefined;
    const drawingUtils = new DrawingUtils(canvasCtx);
    async function predictWebcam() {
    const radio = video.videoHeight / video.videoWidth;
    video.style.width = videoWidth + "px";
    video.style.height = videoWidth * radio + "px";
    canvasElement.style.width = videoWidth + "px";
    canvasElement.style.height = videoWidth * radio + "px";
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await faceLandmarker.setOptions({ runningMode: runningMode });
    }
    let startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = faceLandmarker.detectForVideo(video, startTimeMs);
    }
    if (results.faceLandmarks) {
        for (const landmarks of results.faceLandmarks) {
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_TESSELATION,
            { color: "#C0C0C070", lineWidth: 1 }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
            { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
            { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
            { color: "#30FF30" }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
            { color: "#30FF30" }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
            { color: "#E0E0E0" }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LIPS,
            { color: "#E0E0E0" }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
            { color: "#FF3030" }
        );
        drawingUtils.drawConnectors(
            landmarks,
            FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
            { color: "#30FF30" }
        );
        }
    }
    drawBlendShapes(videoBlendShapes, results.faceBlendshapes);

    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }
    }

    function drawBlendShapes(el, blendShapes) {
    if (!blendShapes.length) {
        return;
    }

    console.log(blendShapes[0]);
    
    let htmlMaker = "";
    blendShapes[0].categories.map((shape) => {
        htmlMaker += `
        <li class="blend-shapes-item">
            <span class="blend-shapes-label">${
            shape.displayName || shape.categoryName
            }</span>
            <span class="blend-shapes-value" style="width: calc(${
            +shape.score * 100
            }% - 120px)">${(+shape.score).toFixed(4)}</span>
        </li>
        `;
    });

    el.innerHTML = htmlMaker;
    }


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