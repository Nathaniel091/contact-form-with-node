


const contactForm = document.querySelector('.contact-form');

let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let submit = document.querySelector('.submit');

contactForm.addEventListener('submit', (event) => {
	event.preventDefault();
	// console.log('submitted')

	// =========================TEST==================================================
		// 
		// POST using fetch (Option 2)
		// let formData = new FormData();
		// formData.append('name', 'John');
		// formData.append('password', 'John123');

		// fetch("url", {
		// 	body: formData,
		// 	method: "post"
		// });
		// .then() // i think this is optional
	// ===========================================================================
	
	// const formData = {
	// 	name: name.value,
	// 	email: email.value,
	// 	subject: subject.value,
	// 	websiteUrl: function() {
	// 		return window.location.href
	// 	},
	// 	message: `${message.value} \n\n\n\n == Details ========== \nFrom: '${name.value}' \nEmail: ${email.value} \nSent From: '${this.name}'`,
	// }
	submit.value = "Please wait...";

	const formData = new function() {
		this.name = name.value;
		this.email = email.value;
		this.subject = subject.value;
		this.websiteUrl = window.location.href;
		this.message = `${message.value} \n\n\n\n == Details ========== \nFrom: '${this.name}' \nEmail: ${this.email} \nComming from: ${this.websiteUrl}`;
	};

	// console.log(formData)

	// console.log('started POST request')

	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/');
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.onload = function() {
		// console.log("xhr.responseText => ", xhr.response);
		// console.log("xhr.responseText => ", xhr.responseText);
		submit.value = "Send Message";
		if(xhr.responseText == 'success') {
			console.log('Email Sent!');
			console.log('Email Sent!!');
			console.log('Email Sent!!!');

			alert('Email Sent! ✔')

			// name.value = '';
			// email.value = '';
			// subject.value = '';
			// message.value = '';
		} else {
			console.log('something went wrong ⛌ \nDont worry its not your fault');

			alert('Something went wrong. ⛌ \nDont worry its not your fault');

			window.open('/public/form-error-page.html', '_blank');
		}
	}
	xhr.send(JSON.stringify(formData));


	// console.log()
});



