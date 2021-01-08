function onSubmitButton() {
    var title = $("#warning_title").val();
    var area_code = $("#area_code").val();
    var eta = $("#eta").val();
    var eta_over = $("#eta_over").val();

    import("./modules/api_client.js").then((api_client) => {

        data = {
            title: title,
            area_code: area_code,
            eta: eta,
            eta_over: eta_over
        };

        api_client.callAPI(
            "warning",
            "POST",
            data,
            function (data, textStatus, jqXHR) {
                // console.log(jqXHR.status + " : " + textStatus);
                $('#created-notification').show();
                $('#failed-notification').hide();
            },
            function (data, textStatus, jqXHR) {
                // console.log(jqXHR.status + " : " + textStatus);
                $('#created-notification').hide();
                $('#failed-notification').show();
            }
        );
    });
}
