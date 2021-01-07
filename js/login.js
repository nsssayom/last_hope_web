function onSubmitButton(is_resend = false) {
	const phoneNumber = $("#phone").val();

	if (!phoneNumber) {
		$("#phone").addClass("is-danger");
		$("#phone").removeClass("is-success");
		$("#phone-help").append("Phone number can't be blank!");
	}
	else {
		import("./modules/api_client.js").then((api_client) => {
			// Check if phone number is valid
			api_client.callAPI(
				`auth/${phoneNumber}`,
				"GET",
				null,
				// API call success
				function (data, textStatus, jqXHR) {
					console.log(jqXHR.status + " : " + textStatus);
					$("#phone").addClass("is-success");
					$("#phone").removeClass("is-danger");
					$("#phone-help").empty();

					// Phone number exists and belong to admin-level user
					// Send SMS with OTP using firebase
					const appVerifier = window.recaptchaVerifier;
					firebase
						.auth()
						.signInWithPhoneNumber(phoneNumber, appVerifier)
						.then((confirmationResult) => {
							// SMS sent. Prompt user to type the code from the message, then sign the
							// user in with confirmationResult.confirm(code).
							window.confirmationResult = confirmationResult;
							if (!is_resend) {
								$("#otp-modal").addClass("is-active");
							}
						})
						.catch((error) => {
							console.log(error);
						});
				},
				// API call failed
				function (data, textStatus, jqXHR) {
					console.log(jqXHR.status + " : " + textStatus);
					$("#phone").addClass("is-danger");
					$("#phone").removeClass("is-success");
					$("#phone-help").empty();
					$("#phone-help").append("Invalid phone number. Please enter registered phone number with country code.");
				}
			);
		});

	}
}

function onAuthSubmit() {
	const phoneNumber = encodeURIComponent($("#phone").val());
	const otpCode = $("#otp-code").val();

	if (!otpCode) {
		$("#otp-help").empty();
		$("#otp-help").removeClass("is-success");
		$("#otp-help").addClass("is-danger");
		$("#otp-help").append("OTP Code Can't be blank");
		return;
	}

	$("#otp-help").empty();
	$("#otp-help").removeClass("is-danger");
	$("#otp-help").addClass("is-success");
	$("#otp-help").append("Waiting for OTP Confirmation");

	window.confirmationResult.confirm(otpCode).then((result) => {
		firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
			console.log("ID TOKEN: ")
			console.log(idToken);
			import("./modules/api_client.js").then((api_client) => {
				api_client.callAPI(
					`auth/token/${idToken}?phone=${phoneNumber}`,
					"GET",
					null,
					// API call success
					function (data, textStatus, jqXHR) {
						console.log(jqXHR.status + " : " + textStatus);
						console.log(data);
						if (jqXHR.status = 200){
							import ('./modules/api_client').then((setCookie) => {
								setCookie("token", idToken, 1);
							});
							window.location.replace ('http://192.168.31.200/dashboard.html');
						}
					},
					// API call failed
					function (data, textStatus, jqXHR) {
						console.log(jqXHR.status + " : " + textStatus);
						// user info retrieval failed
					}
				);
			});
		}).catch(function (error) {
			console.log(error);
		});

		//var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
		//firebase.auth().signInWithCredential(credential);

	}).catch((error) => {
		$("#phone").empty();
		$("#phone-help").empty();
		$("#phone-help").append("Wrong Code! Try again.");
	});
}