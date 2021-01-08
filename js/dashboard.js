$(document).ready(function () {
	let menu_btn_selected = "btn-dashboard";

	$('#content').empty();
	$("<iframe>", {
		src: "./views/dashboard.html",
		id: "content-frame",
		frameborder: 0,
		scrolling: "no",
	}).appendTo("#content");

	$(".menu-btn").click(function () {
		$("#" + menu_btn_selected).removeClass("is-active");
		menu_btn_selected = this.id;
		$("#" + menu_btn_selected).addClass("is-active");

		switch (menu_btn_selected) {
			case "btn-add-user":
				$('#content').empty();
				$("<iframe>", {
					src: "./views/user_registration.html",
					id: "content-frame",
					frameborder: 0,
					scrolling: "no",
				}).appendTo("#content");
				break;

			case "btn-dashboard":
				$('#content').empty();
				$("<iframe>", {
					src: "./views/dashboard.html",
					id: "content-frame",
					frameborder: 0,
					scrolling: "no",
				}).appendTo("#content");
				break;

			case "btn-add-device":
				$('#content').empty();
				$("<iframe>", {
					src: "./views/device_registration.html",
					id: "content-frame",
					frameborder: 0,
					scrolling: "no",
				}).appendTo("#content");
				break;
			
			case "btn-create-warning":
				$('#content').empty();
				$("<iframe>", {
					src: "./views/new_warning.html",
					id: "content-frame",
					frameborder: 0,
					scrolling: "no",
				}).appendTo("#content");
				break;
		}
	});
});
