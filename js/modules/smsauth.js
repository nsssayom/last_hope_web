var firebaseConfig = {
    apiKey: "AIzaSyBmLubowu1cfWrSDvW8jRhERAe8KzRc6UE",
    authDomain: "last-hope-7abd2.firebaseapp.com",
    projectId: "last-hope-7abd2",
    storageBucket: "last-hope-7abd2.appspot.com",
    messagingSenderId: "548371008238",
    appId: "1:548371008238:web:59f6d17f804424e53241ff",
    measurementId: "G-Q9N3WK5DY1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a Recaptcha verifier instance globally
// Calls submitPhoneNumberAuth() when the captcha is verified
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
        size: "normal",
        callback: function (response) {
            //submitPhoneNumberAuth();
            document.getElementById("submit-button").disabled = false;
        }
    }
);

// This function runs when the 'sign-in-button' is clicked
// Takes the value from the 'phoneNumber' input and sends SMS to that phone number
function submitPhoneNumberAuth() {
    var phoneNumber = document.getElementById("phoneNumber").value;
    var appVerifier = window.recaptchaVerifier;
    firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// This function runs when the 'confirm-code' button is clicked
// Takes the value from the 'code' input and submits the code to verify the phone number
// Return a user object if the authentication was successful, and auth is complete
function submitPhoneNumberAuthCode() {
    var code = document.getElementById("code").value;
    confirmationResult
        .confirm(code)
        .then(function (result) {
            var user = result.user;
            console.log(user);
        })
        .catch(function (error) {
            console.log(error);
        });
}

//This function runs everytime the auth state changes. Use to verify if the user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("USER LOGGED IN");
    } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN");
    }
});