const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const expressValidator = require('express-validator');
const app = express();
/* paypal */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const payPalClient = require('./paypalClient');
/*firebase*/
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://boostarabia-e1ecf.firebaseio.com"
});

const db = firebase.firestore();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index', { title: "Home" });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: "Contact" });
});

app.get('/boost_apex', (req, res) => {
  res.render('boost_apex', { title: "Apex Boost" });
});

app.get('/boost_overwatch', (req, res) => {
  res.render('boost_overwatch', { title: "Overwatch Boost" });
});

app.get('/boost_fortnite', (req, res) => {
  res.render('boost_fortnite', { title: "Fortnite Boost" });
});

app.get('/login', (req, res) => {
  res.render('login', { title: "Login", error: 0 });
});

app.get('/reset_password', (req, res) => {
  res.render('reset_password', { title: "Reset Password" });
});


app.get('/register', (req, res) => {
  res.render('register', { title: "Register new account", errors: null });
});


app.get('/logout', (req, res) => {
  res.render('index', { title: "Home" });
});

app.get('/signout', (req, res) => {
  res.render('signout', { title: "signout" });
});

// app.get('/register_success', (req, res) => {
//   res.render('register_success', { title: "Registered Successfully!" });
// });

// app.get('/verify', (req, res) => {
//   let data = {logged_in: false, displayName: "test", emailWebsite: "test.com", email: "test@test.com"}
//   res.render('verify', {title: "Verify Your Email", data: data});
// });

/* --  POST Requests -- */
// verify again process
app.post('/verifyAgain', (req, res) => {
  verifyEmail(req.body.email, req.body.displayName);
  res.json({ success: true });
});

// login process *not currently in use
// app.post('/login', (req,res)=>{
//   const checkedReq = checkLoginData(req);
//   const errors = checkedReq.validationErrors();
//   console.log(req);
//   if (errors) {
//     // sending errors to /views/register
//     // res.render('login', { title: "Login", errors: errors });
//   }
//   else {
//     // logging In
//     loginUser(req.body.email, req.body.password);
//   }
// });

//Registeration process
app.post('/register', (req, res) => {
  const checkedReq = checkRegisterData(req);
  const errors = checkedReq.validationErrors();
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.usrPass;
  const displayName = firstName;
  if (errors) {
    // sending errors to /views/register
    res.render('register', { title: "Register new account", errors: errors });
  }
  else {
    //creating user
    createNewUser(checkedReq, res);
  }

});


/* Paypal here */
app.post('/paypal-transaction-complete', async (req, res) => {

  // 2. Set up your server to receive a call from the client

  // 2a. Get the order ID from the request body
  const orderID = req.body.orderID;
  // 3. Call PayPal to get the transaction details
  let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);
  let order;
  try {
    order = await payPalClient.client().execute(request);
  } catch (err) {
    // 4. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }

  // 5. Validate the transaction details are as expected
  // purchase details
  // console.log("now details")
  // console.log(req.body.purchase_details)
  // console.log("now booster")
  // console.log(req.body.booster)
  // looping through details
  // let keys = req.body.purchase_details
  //   for (let key in keys)
  //       console.log(key + " " + keys[key])

  // 6. Save the transaction in your database
  // await database.saveTransaction(orderID);
  // console.log(order.result.payer.email_address) // how to get buyer email

  // 7 Send purchase details to booster and owners

  // 8. Return a successful response to the client
  return res.send(200);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('notfound', { title: "Page Not Found" });
});

app.listen(8000);

/* --------- Functions --------- */

/* SignUp */
function createNewUser(req, res) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.usrPass;
  const displayName = firstName;
  // email website #additional
  let emailWebsite = "http://";
  emailWebsite += email.substr(email.search("@"), email.search(".com") - email.search("@"));
  emailWebsite += ".com";

  firebase.auth().createUser({
    email: email,
    emailVerified: false,
    first: firstName,
    last: lastName,
    password: password,
    disabled: false,
    displayName: displayName
  })
    .then(function (userRecord) {
      // Create User Success

      initUserDatabase(userRecord);
      verifyEmail(email, displayName);
      let data = { logged_in: false, displayName: displayName, emailWebsite: emailWebsite, email: email }
      res.render('verify', { title: "Verify Your Email", data: data });
    })
    .catch(function (error) {
      // Create User Failure
      res.render('register', { title: "Register new account", errors: error });
    });
}

function checkRegisterData(req) {
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('firstName', 'first Name is required').trim().notEmpty();
  req.checkBody('lastName', 'Last Name is required').trim().notEmpty();
  req.checkBody('usrPass', 'Password is required').notEmpty();
  req.checkBody('confUsrPass', 'Passwords Do not match').equals(req.body.usrPass);

  return req;
}

function initUserDatabase(userRecord) {
  let Ref = db.collection('users').doc(userRecord.uid);
  Ref.set({
    purchases: {}
  });
}

function verifyEmail(email, displayName) {
  // return address
  let actionCodeSettings = {
    url: 'http://localhost:5000/login',
    handleCodeInApp: false,
  };

  // generating email auth msg
  firebase.auth().generateEmailVerificationLink(email, actionCodeSettings)
    .then(function (link) {
      // sending msg through nodemailer
      sendVerificationLink(email, link, displayName);

    }).catch(function (error) {
      console.log("didn't generate confirmation email: " + error);
    });
}

function sendVerificationLink(email, link, displayName) {

  let transporter = nodeMailer.createTransport('smtps://verifyboostarabia%40gmail.com:azizmohammadboost@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  let mailOptions = {
    from: '"BoostArabia" <verifyboostarabia@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Verify your email for boostArabia', // Subject line
    text: `Hello ${displayName},\nFollow this link to verify your email address.\n\n${link}\n\nIf you didn’t ask to verify this address, you can ignore this email.\nThanks,\nboostArabia team`, // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("didn't send verification email: " + error);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
  });


}

/* Login */

// function loginUser(email, password)
// {
//   firebase.auth().getUserByEmail(email).then((userRecord)=>{

//     let hash = userRecord.passwordHash;


//   }).catch((error)=>{
//     // email not found
//       console.log("email not found");
//   });
// }

// function checkLoginData(req) {
//   req.checkBody('email', 'Email is required').notEmpty();
//   req.checkBody('email', 'Email is not valid').isEmail();
//   req.checkBody('password', 'Password is required').notEmpty();
//   return req;
// }

exports.app = functions.https.onRequest(app);
