



// ==================.env=============
// MY_EMAIL_ADDRESS1
// MY_EMAIL_APP_PASSWORD1
// ==================End .env=============

// how to store my auth in environment variable so no one can access it


const express = require("express");
const app = express();

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;
// console.log("MY_EMAIL_APP_PASSWORD1 => ", process.env.MY_EMAIL_APP_PASSWORD1)

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/public/contactform.html')
}); 



app.post('/', (req, res)=>{
	// console.log("req.body => ", req.body)

	const MY_EMAIL_ADDRESS1 = process.env.MY_EMAIL_ADDRESS1;
	const MY_EMAIL_APP_PASSWORD1 = process.env.MY_EMAIL_APP_PASSWORD1;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			// user: MY_EMAIL_ADDRESS1,
			user: MY_EMAIL_ADDRESS1,
			pass: MY_EMAIL_APP_PASSWORD1,
		},
	});

	// for custom domain/email
	// e.g 123-reg.co.uk
	// then edit the 'mailOptions.to' too
	// const transporter = nodemailer.createTransport({
	// 	host: 'smtp.123-reg.co.uk',
	// 	port: 587,
	// 	// secure: true,
	// 	auth: {
	// 		user: 'info@business-name-here.com',
	// 		pass: 'testpassword01!',
	// 	},
	// });


	const mailOptions = {
		from: req.body.email, 
		// to: 'info@business-name-here.com',
		to: 'nathanielsamuel091@gmail.com',
		subject: `Message from '${req.body.name}':  ${req.body.subject}.`,
		text: `${req.body.message}`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			// console.log("nodemailer error => ", error)
			console.log("==> nodemailer error.response => ", error.response)
			res.send('error');

			app.get('/public/form-error-page.html', function(req, res) {
				res.send(`========== AN ERROR OCCURRED! ========== <br> -----> ${error.response} <br><br><br> -----> Don't worry it's not your fault.`);
			});

		}else {
			res.send('success');
			console.log('==> Email was sent! ✔ : > info.response ' + info.response);
		};
	});
});

app.listen(PORT, ()=>{
	console.log(`==>    Server running on port ${PORT}`)
});


