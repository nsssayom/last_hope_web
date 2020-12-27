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