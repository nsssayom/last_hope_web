$(document).ready(function () {
    import("./modules/api_client.js").then((api_client) => {
        api_client.callAPI(
            "devices",
            "GET",
            null,
            function (data, textStatus, jqXHR) {
                console.log(jqXHR.status + " : " + textStatus);

                console.log(data);
                data.forEach(element => {
                    $("#devices-container")
                        .append(`<tr> 
                                <td> ${element['id']} </td> 
                                <td> ${element['user']['id']} </td>
                                <td> ${element['gsm_imei']} </td>
                                <td> ${element['gsm_msisdn']} </td>
                                <td> ${element['assigned_on']} </td>
                                <td class="has-text-centered">
                                    <button class="button is-danger" id="btn-map">
                                        <span class="icon is-small">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>`);
                });

            },
            function (data, textStatus, jqXHR) {
                console.log(jqXHR.status + " : " + textStatus);
            }
        );
    });
});