const home = document.getElementById('home');

// Slide function

let leftTriangle = document.querySelector('.home__left-triangle');
let rightTriangle = document.querySelector('.home__right-triangle');
let homeBtn = document.querySelector('.home__btn');
let logo = document.getElementById('logo');

const observeTheSlide = new IntersectionObserver(slide);

function slide() {
	setTimeout(() => {
		leftTriangle.classList.toggle('slide-right');
		rightTriangle.classList.toggle('slide-left');
		homeBtn.classList.toggle('ctaAnimation');
	}, 100);
}

observeTheSlide.observe(home);

//Skills container

const assets = [
	{
		icon: 'assets/icons/HTML.png',
		img: 'assets/img/castle.jpg',
		github: 'https://github.com/jorgenaa/Semester_project_2',
		website: '#',
	},
	{
		icon: 'assets/icons/CSS.png',
		img: 'assets/img/code_1024x768.jpg',
		github: 'https://github.com/jorgenaa/Covid-19-app',
		website: '#',
	},
	{
		icon: 'assets/icons/JavaScript.png',
		img: 'assets/img/Endeavour_In_Space.jpg',
		github: 'https://github.com/jorgenaa/Project-Exam-1',
		website: '#',
	},
	{
		icon: 'assets/icons/Bootstrap.png',
		img: 'assets/img/design_page.jpg',
		github: 'https://github.com/jorgenaa/Design_2_Module_Assignment',
		website: '#',
	},
	{
		icon: 'assets/icons/Sass.png',
		img: 'assets/img/code_1024x768.jpg',
		github: '#',
		website: '#',
	},
	{
		icon: 'assets/icons/GitHub.png',
		img: 'assets/img/code_1024x768.jpg',
		github: '#',
		website: '#',
	},
	{
		icon: 'assets/icons/Illustrator.png',
	},
	{
		icon: 'assets/icons/Photoshop.png',
	},
	{
		icon: 'assets/icons/XD.png',
	},
	{
		icon: 'assets/icons/Wordpress.png',
	},
	{
		icon: 'assets/icons/Scrum.png',
	},
];

const skillsContainer = document.getElementById('skills').childNodes[3];

for (let i = 0; i < assets.length; i++) {
	skillsContainer.innerHTML += `
			<img class="skills__icon animated" src="${assets[i].icon}" alt="icons" data-aos="fade-right">
	`;
}

const portfolioContainer = document.getElementById('portfolio').childNodes[3];

for (let i = 0; i < 4; i++) {
	portfolioContainer.innerHTML += `
			<div class="portfolio__card animated" src="${i}" alt="card" data-aos="fade-right">
				<div class="portfolio__card-body">
					<img class="portfolio__card-img" src="${assets[i].img}" alt="">
					<a href="${assets[i].github}" class="portfolio__btn portfolio__btn--blue portfolio__btn--hover">
						<i class="fab fa-github"></i> Github
					</a>	
					<a href="${assets[i].website}" class="portfolio__btn portfolio__btn--pink portfolio__btn--hover">
						<i class="fas fa-eye"></i> Project
					</a>
				</div>
			</div>
	`;
}

const form = document.querySelector('#contactForm');
const sendButton = document.getElementById('sendButton');
const loader = document.querySelector('.contact__loader');
const responseMessage = document.querySelector('#responseMessage');

const name = document.querySelector('#name');
const nameError = document.querySelector('#name').attributes[4];
let nameHasError = false;

const subject = document.querySelector('#subject');
const subjectError = document.querySelector('#subject').attributes[4];
let subjectHasError = false;

const message = document.querySelector('#message');
const messageError = document.querySelector('#message').attributes[5];
let messageHasError = false;

const email = document.querySelector('#email');
const emailError = document.querySelector('#email').attributes[3];
let emailHasError = false;

const url =
	'https://sdaot6lkal.execute-api.us-east-2.amazonaws.com/default/SendEmail';

sendButton.addEventListener('click', sendUser);

async function sendUser(e) {
	e.preventDefault();
	loader.style.display = 'block';
	form.style.opacity = 0;

	const nameValue = name.value;
	const subjectValue = subject.value;
	const messageValue = message.value;
	const emailValue = email.value;

	const data = {
		name: nameValue,
		email: emailValue,
		subject: subjectValue,
		message: messageValue,
	};

	try {
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
		}).then(response => {
			
			if (response.status === 400) {
				responseMessage.innerHTML = 'An error occurred: ' + response.statusText;
			} else {
				responseMessage.innerHTML = 'Message is sent';
				name.value = '';
				email.value = '';
				subject.value = '';
				message.value = '';
				// 	disable the button once the form has been submitted
				sendButton.disabled = true;
			}
		});
	} catch (error) {
		console.log(error);
		responseMessage.innerHTML = JSON.stringify(error);
		responseMessage.innerHTML = 'Message is not sent';
	} finally {
		loader.style.display = 'none';
		form.style.opacity = 1;
	}
}

//Validate contact form

//Hide error color style on input placeholders
const placeholders = document.querySelectorAll('#contactForm div');
placeholders.forEach(function (placeholder) {
	placeholder.childNodes[1].classList.remove('contact__input--error');
});

name.addEventListener('keyup', validateForm);
email.addEventListener('keyup', validateForm);
subject.addEventListener('keyup', validateForm);
message.addEventListener('keyup', validateForm);

function validateForm(e) {
	e.preventDefault();
	let disabled = false;
	// test name
	const nameValue = name.value;

	if (checkInputLength(nameValue, 1) === true) {
		nameError.textContent = '';
		nameHasError = false;
	} else {
		nameError.textContent = 'Please enter your name';
		name.classList.add('contact__input--error');
		nameHasError = true;
	}

	// test subject
	const subjectValue = subject.value;

	if (checkInputLength(subjectValue, 1) === true) {
		subjectError.textContent = '';

		subjectHasError = false;
	} else {
		subjectError.textContent = 'Please enter a subject';
		subject.classList.add('contact__input--error');
		subjectHasError = true;
	}

	// test message
	const messageValue = message.value;

	if (checkInputLength(messageValue, 6) === true) {
		messageError.textContent = '';

		messageHasError = false;
	} else {
		messageError.textContent = 'Your message must have at least 6 characters';
		message.classList.add('contact__input--error');
		messageHasError = true;
	}
	// test email
	const emailValue = email.value;

	if (validateEmail(emailValue)) {
		emailError.textContent = '';

		emailHasError = false;
	} else {
		emailError.textContent = 'Please enter a valid email address';
		email.classList.add('contact__input--error');
		emailHasError = true;
	}
	//decide whether to display the submitted message

	if (
		!validateEmail(email.value) ||
		!checkInputLength(name.value, 3) ||
		!checkInputLength(subject.value, 3) ||
		!checkInputLength(message.value, 5)
	) {
		disabled = true;
	}
	sendButton.disabled = disabled;
}

function checkInputLength(value, length) {
	const trimmedValue = value.trim();

	if (trimmedValue.length >= length) {
		return true;
	} else {
		return false;
	}
}

function validateEmail(emailValue) {
	const regEx = /\S+@\S+\.\S+/;

	if (regEx.test(emailValue)) {
		return true;
	} else {
		return false;
	}
}

//Responsive Navbar

let responsiveNavbar = document.querySelector('.navbar');

document.getElementById('hamburger').addEventListener('click', function () {
	if (responsiveNavbar.className === 'navbar') {
		responsiveNavbar.className = 'navbar--responsive';
	} else {
		responsiveNavbar.className = 'navbar';
	}
});

// Active NAV

let links = document.querySelectorAll('.nav__link');

for (let link of links) {
	link.addEventListener('click', function () {
		for (let link of links) {
			link.classList.remove('nav__link--active');
		}
		this.classList.add('nav__link--active');
	});
}

let mobileLinks = document.querySelectorAll('.navbar__link');

for (let mobileLink of mobileLinks) {
	mobileLink.addEventListener('click', function () {
		for (let mobileLink of mobileLinks) {
			mobileLink.classList.remove('navbar__link--active');
		}
		this.classList.add('navbar__link--active');
	});
}

//On scroll header

const header = document.getElementById('header');
const about = document.getElementById('about');
const skills = document.getElementById('skills');
const portfolio = document.getElementById('portfolio');
const contact = document.getElementById('contact');

const stickyHeaderPosition = {
	rootMargin: '-200px 0px 0px 0px',
};

const headerObserver = new IntersectionObserver(function (
	entries,
	headerObserver
) {
	entries.forEach(entry => {
		if (!entry.isIntersecting) {
			header.classList.add('sticky');
		} else {
			header.classList.remove('sticky');
		}
	});
},
stickyHeaderPosition);

headerObserver.observe(home);

// Change active state of navbar on scroll

const options = {
	threshold: 0.7,
};

const sectionObserver = new IntersectionObserver(navbar, options);

function navbar(entries) {
	entries.forEach(entry => {
		const sections = entry.target.className;
		const activeLink = document.querySelector(`[data-section=${sections}]`);
		if (!entry.isIntersecting) {
			activeLink.classList.remove('nav__link--active');
		} else {
			activeLink.classList.add('nav__link--active');
		}
	});
}

sectionObserver.observe(about);
sectionObserver.observe(skills);
sectionObserver.observe(portfolio);
sectionObserver.observe(contact);


//Initialize AOS
AOS.init({
	offset: 400,
	duration: 1000,
});




//Initialize Smooth Scroll
const scroll = new SmoothScroll(
	'.nav__navbar a[href*="#"], .home__btn, #logo',
	{
		speed: 800,
	}
);
