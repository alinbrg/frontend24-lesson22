const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
	getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
	getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", //id, method  GET
	updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", //id, method PUT  ყველა ველი სავალდებულო
	deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; //id, method DELETE

const regForm = document.querySelector("#reg"),
	userName = document.querySelector("#user_name"),
	userSurname = document.querySelector("#user_surname"),
	userEmail = document.querySelector("#user_email"),
	userPhone = document.querySelector("#user_phone"),
	userPersonalID = document.querySelector("#user_personal-id"),
	userZip = document.querySelector("#user_zip-code"),
	userGender = document.querySelector("#user_gender"),
	// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
	user_id = document.querySelector("#user_id"),
	userTableBody = document.querySelector("tbody");

const user = {
	first_name: "satesto",
	last_name: "text",
	phone: "123456789",
	id_number: "12345678909",
	email: "text@gmail.com",
	gender: "male",
	zip_code: "1245",
};

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

const openRegFormBtn = document.querySelector("#open-reg-form");

openRegFormBtn.addEventListener("click", () => {
	showSelectedModal("#reg-modal");
});

// fetch("https://jsonplaceholder.typicode.com/posts/1")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => console.error(error));

async function getPost() {
	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/posts/1",
			{
				method: "GET",
			}
		);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

// getPost();

// TODO: დაასრულეთ შემდეგი ფუნქციები

function userActions() {
	// 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
	// 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
	// 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით მაგ:selectedElement.dataset
	// 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUser ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
	// 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი. ედიტის ღილაკზე უნდა გამოიძახოთ getUserInfo ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს) const data = await getUser(btn.dataset.userId); ეს დატა უნდა შეივსოს ფორმში და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია და ფორმის დასაბმითებისას უნდა მოხდეს updateUser() ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც  მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლიათ შეინახოთ.

	const editBtns = document.querySelectorAll(".edit");
	const deleteBtns = document.querySelectorAll(".dlt");

	editBtns.forEach((btn) => {
		btn.addEventListener("click", async (e) => {
			console.log(btn.dataset.userId, "edit");

			const data = await getUserInfo(btn.dataset.userId);
			// console.log("received user data", data);

			userName.value = data.users.first_name;
			userSurname.value = data.users.last_name;
			userEmail.value = data.users.email;
			userPhone.value = data.users.phone;
			userPersonalID.value = data.users.id_number;
			userZip.value = data.users.zip_code;
			userGender.value = data.users.gender;
			user_id.value = data.users.id;

			showSelectedModal("#reg-modal");
		});
	});

	deleteBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			console.log(btn.dataset.userId, "delete");
			const id = btn.dataset.userId;
			deleteUser(id);
		});
	});
}

function renderUsers(usersArray) {
	// TODO: usersArray არის სერვერიდან დაბრუნებული ობიექტების მასივი
	// TODO: ამ მონაცმების მიხედვით html ში ჩასვით ცხრილი როგორც "ცხრილი.png" შია

	const userRows = usersArray.map((user) => {
		return `
						<tr>
							<td>${user.id}</td>
							<td>${user.first_name}</td>
							<td>${user.last_name}</td>
							<td>${user.email}</td>
							<td>${user.id_number}</td>
							<td>${user.phone}</td>
							<td>${user.zip_code}</td>
							<td>${user.gender}</td>
							<td>
								<button class="edit btn" type="button" data-user-id="${user.id}" data-name="satesto">Edit</button>
								<button class="dlt btn" type="button" data-user-id="${user.id}">Delete</button>
							</td>
						</tr>`;
	});

	userTableBody.innerHTML = userRows.join("");
	// console.log(usersArray);
	userActions(); // ყოველ რენდერზე ახლიდან უნდა მივაბათ ივენთ ლისნერები
}

function getAllUsers() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((response) => response.json())
		.then((data) => {
			if (data.status === 1) {
				// console.log(data.users);
				const users = data.users;
				// html-ში გამოტანა მონაცემების
				renderUsers(users);
			}
		})
		.catch((error) => console.error(error));
}

function deleteUser(id) {
	fetch(`https://borjomi.loremipsum.ge/api/delete-user/${id}`, {
		method: "delete",
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			// გვიბრუნებს სტატუსს
			getAllUsers(); // შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან უნდა წამოვიღოთ დატა
			// ამიტომ აქ ყველგან დაგვჭირდება უბრალოდ ამ ფუნქციის გამოძახება, რომელიც ხელახლა გადახატავს ინფორმაციას
		})
		.catch((error) => {
			console.log(error);
		});
}

async function getUserInfo(id) {
	try {
		const response = await fetch(
			`https://borjomi.loremipsum.ge/api/get-user/${id}`
		);
		const data = await response.json();
		return data;
	} catch (e) {
		console.log("Error - ", e);
	}
}

function updateUser(userObj) {
	// მიიღებს დაედითებულ ინფორმაციას და გააგზავნით სერვერზე
	// TODO დაასრულეთ ფუნქცია
	//  method: "put",  http://borjomi.loremipsum.ge/api/update-user/${userObj.id}
	// TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა

	fetch(`https://borjomi.loremipsum.ge/api/update-user/${userObj.id}`, {
		method: "put",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userObj),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			getAllUsers();

			user_id.value = "";
			regForm.reset();
			//ფორმის დახურვა
			document.querySelector("#reg-modal").classList.remove("open");
		})
		.catch((e) => {
			console.log("error", e);
		});
}

getAllUsers();

function createUser(user) {
	console.log(user, JSON.stringify(user));

	fetch("https://borjomi.loremipsum.ge/api/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			getAllUsers();
			user_id.value = "";
			regForm.reset();
			document.querySelector("#reg-modal").classList.remove("open");
		});
}

regForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const user = {
		id: user_id.value, //ეს #user_id hidden input გვაქვს html-ში და ამას გამოვიყენებთ მხოლოდ დაედითებისთვის
		first_name: userName.value,
		last_name: userSurname.value,
		email: userEmail.value,
		phone: userPhone.value,
		id_number: userPersonalID.value,
		zip_code: userZip.value,
		gender: userGender.value,
	};

	// createUser(user);

	//  TODO: თუ user_id.value არის ცარიელი (თავიდან ცარიელია) მაშინ უნდა შევქმნათ  -->  createUser(user);
	// თუ დაედითებას ვაკეთებთ, ჩვენ ვანიჭებთ მნიშვნელობას userActions ფუნქციაში
	// TODO: თუ user_id.value არის (არაა ცარიელი სტრინგი) მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფუთით ვავსებთ, ვაედითებთ და ვასაბმითებთ) -->  updateUser(user);
	if (user.id) {
		console.log("update");
		updateUser(user);
	} else {
		console.log("add new");
		createUser(user);
	}
});
