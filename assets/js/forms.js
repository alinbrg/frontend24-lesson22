const form = document.querySelector("form");
const nameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const nameError = document.querySelector("#username-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const personalNumber = document.querySelector("#personal-number");
const mobileNumber = document.querySelector("#mobile-number");
const jobDescription = document.querySelector("#job-description");
const personalNumberError = document.querySelector("#personal_number-error");
const mobileNumberError = document.querySelector("#mobile_number-error");
const jobDescriptionError = document.querySelector("#job_description-error");
const inputs = document.querySelectorAll("input");

const openModal = document.querySelector(".open-sign-in");
const modal = document.querySelector("#sign-up-modal");
const closeModal = document.querySelector(".modal-close");
const dialog = document.querySelector("dialog");

const closeDialog = dialog.querySelector(".modal-close");

try {
	openModal.addEventListener("click", () => {
		dialog.show();
	});

	closeDialog.addEventListener("click", (e) => {
		dialog.close();
	});
} catch (error) {
	console.error(error);
} finally {
	console.log("finally block");
}

function checkUserName() {
	if (nameInput.value.trim() === "") {
		nameError.textContent = "Username is required";
		nameInput.classList.remove("correct");
		nameInput.classList.add("error");
		return false;
	} else {
		nameError.textContent = "";
		nameInput.classList.remove("error");
		nameInput.classList.add("correct");
		return true;
	}
}

function checkEmail() {
	if (emailInput.validity.valid === false) {
		emailError.textContent = "Email is required";

		if (emailInput.validity.typeMismatch) {
			emailError.textContent = "Please enter a valid email address";
		}
		emailInput.classList.remove("correct");
		emailInput.classList.add("error");

		return false;
	} else {
		emailError.textContent = "";
		emailInput.classList.remove("error");
		emailInput.classList.add("correct");
		return true;
	}
}

function checkPassword() {
	if (passwordInput.value.trim() === "") {
		passwordError.textContent = "Password is required";
		passwordInput.classList.remove("correct");
		passwordInput.classList.add("error");
		return false;
	} else if (/[a-zA-Z0-9]/.test(passwordInput.value) === false) {
		passwordError.textContent = "Password must contain numbers or letters";
		passwordInput.classList.remove("correct");
		passwordInput.classList.add("error");
		return false;
	} else if (passwordInput.value.length < 8) {
		passwordError.textContent = "Password must contain at least 8 characters";
		passwordInput.classList.remove("correct");
		passwordInput.classList.add("error");
		return false;
	} else {
		passwordError.textContent = "";
		passwordInput.classList.remove("error");
		passwordInput.classList.add("correct");
		return true;
	}
}
function checkMobileNumber() {
	if (mobileNumber.value.trim() === "") {
		mobileNumberError.textContent = "mobile number is required";
		mobileNumber.classList.remove("correct");
		mobileNumber.classList.add("error");
		return false;
	} else if (/^\d+$/.test(mobileNumber.value) === false) {
		mobileNumberError.textContent = "mobile number must contain only numbers";
		mobileNumber.classList.remove("correct");
		mobileNumber.classList.add("error");
		return false;
	} else if (mobileNumber.value.length !== 9) {
		mobileNumberError.textContent =
			"mobile number must contain only 9 characters";
		mobileNumber.classList.remove("correct");
		mobileNumber.classList.add("error");
		return false;
	} else {
		mobileNumberError.textContent = "";
		mobileNumber.classList.remove("error");
		mobileNumber.classList.add("correct");
		return true;
	}
}
function checkPersonalNumber() {
	if (personalNumber.value.trim() === "") {
		personalNumberError.textContent = "personal number is required";
		personalNumber.classList.remove("correct");
		personalNumber.classList.add("error");
		return false;
	} else if (/^\d+$/.test(personalNumber.value) === false) {
		personalNumberError.textContent =
			"personal number must contain only numbers";
		personalNumber.classList.remove("correct");
		personalNumber.classList.add("error");
		return false;
	} else if (personalNumber.value.length !== 11) {
		personalNumberError.textContent =
			"personal number must contain only 11 characters";
		personalNumber.classList.remove("correct");
		personalNumber.classList.add("error");
		return false;
	} else {
		personalNumberError.textContent = "";
		personalNumber.classList.remove("error");
		personalNumber.classList.add("correct");
		return true;
	}
}
function checkJonDescription() {
	if (jobDescription.value.length > 50) {
		jobDescriptionError.textContent =
			"Job description must contain only 50 characters";
		jobDescription.classList.remove("correct");
		jobDescription.classList.add("error");
		return false;
	} else {
		jobDescriptionError.textContent = "";
		jobDescription.classList.remove("error");
		jobDescription.classList.add("correct");
		return true;
	}
}

nameInput.addEventListener("input", checkUserName);
emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);

mobileNumber.addEventListener("input", checkMobileNumber);
personalNumber.addEventListener("input", checkPersonalNumber);
jobDescription.addEventListener("input", checkJonDescription);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const isUserNameValid = checkUserName();
	const isEmailValid = checkEmail();
	const isPAsswordValid = checkPassword();
	const isMobileNumberValid = checkMobileNumber();
	const isPersonalNumberValid = checkPersonalNumber();
	const isJobDescriptionValid = checkJonDescription();

	// if true then submit the form

	if (
		isUserNameValid &&
		isEmailValid &&
		isPAsswordValid &&
		isMobileNumberValid &&
		isPersonalNumberValid &&
		isJobDescriptionValid
	) {
		// form.submit();
		showSelectedModal("#sign-up-modal");

		form.reset();
		inputs.forEach((el) => el.classList.remove("correct"));
	} else {
		showSelectedModal("#sign-up-error-modal");
	}
});

function showSelectedModal(selector) {
	const modal = document.querySelector(selector);
	const closeBtn = modal.querySelector(".modal-close");
	if (modal) {
		modal.classList.add("open");
	}

	if (closeBtn) {
		closeBtn.addEventListener("click", () => {
			modal.classList.remove("open");
		});
	}
}
