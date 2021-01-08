function onSubmitButton() {
    var id_type = $("#id_type").val();
    var id_number = $("#id_number").val();
    var gsm_imei = $("#gsm_imei").val();
    var gsm_msisdn = $("#gsm_msisdn").val();
    var area_code = $("#area_code").val();

    import("./modules/api_client.js").then((api_client) => {

        data = {
            id_type: id_type,
            id_number: id_number,
            gsm_imei: gsm_imei,
            gsm_msisdn: gsm_msisdn,
            area_code: area_code
        };

        api_client.callAPI(
            "device",
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
