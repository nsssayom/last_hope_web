$(document).ready(function () {
	// Disable submit button
	//document.getElementById("submit-button").disabled = true;

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function () {
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
	});

	// Alpha-only class only to allow alphabets as input
	$(".alpha-only").on("keydown", function (event) {
		// Allow controls such as backspace, tab etc.
		var arr = [8, 9, 16, 17, 20, 32, 35, 36, 37, 38, 39, 40, 45, 46];

		// Allow letters
		for (var i = 65; i <= 90; i++) {
			arr.push(i);
		}

		// Prevent default if not in array
		if (jQuery.inArray(event.which, arr) === -1) {
			event.preventDefault();
		}
	});

	$(".otp-modal-closer").click(function () {
		$("#otp-modal").removeClass("is-active");
	});

	// Check for click events on submit button

	//$("#submit-button").click();
});

function onSubmitButton() {
	var id_type = $("#id_type").val();
	var id_number = $("#id_number").val();
	var name = $("#name").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var user_level = $("#user_level").val();

	var is_any_blank = false;

	input_arr = {
		//'id_type': id_type,
		id_number: id_number,
		name: name,
		email: email,
		phone: phone,
		//'user_level': user_level,
	};

	for (const [parameter, value] of Object.entries(input_arr)) {
		if (!value) {
			console.log(`empty value at index: ${parameter}`);
			$("#" + parameter).addClass("is-danger");
			$("#" + parameter).removeClass("is-success");
			is_any_blank = true;
		} else {
			import("./modules/api_client.js").then((api_client) => {
				if (parameter === "name") {
					$("#" + parameter).addClass("is-success");
					$("#" + parameter).removeClass("is-danger");
				} else {
					if (parameter === "id_number") {
						data = { id_type: id_type, id_number: id_number };
					} else {
						data = { [parameter]: value };
					}

					api_client.callAPI(
						"validate",
						"POST",
						data,
						function (data, textStatus, jqXHR) {
							console.log(jqXHR.status + " : " + textStatus);
							$("#" + parameter).addClass("is-success");
							$("#" + parameter).removeClass("is-danger");
						},
						function (data, textStatus, jqXHR) {
							console.log(jqXHR.status + " : " + textStatus);
							$("#" + parameter).addClass("is-danger");
							$("#" + parameter).removeClass("is-success");
							is_any_blank = true;
						}
					);
				}
			});
		}
	}

	if (!is_any_blank) {
		const phoneNumber = $("#phone").val();
		const appVerifier = window.recaptchaVerifier;
		firebase
			.auth()
			.signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				$("#otp-modal").addClass("is-active");
				// ...
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
