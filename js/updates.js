$(document).ready(function () {
    import("./modules/api_client.js").then((api_client) => {
        api_client.callAPI(
            "updates",
            "GET",
            null,
            function (data, textStatus, jqXHR) {
                console.log(jqXHR.status + " : " + textStatus);
                data.forEach(element => {
                    $("#update-container")
                        .append(`<tr> 
                                <td> ${element['user_id']} </td> 
                                <td> ${element['long']} </td>
                                <td> ${element['lat']} </td>
                                <td> ${element['heart_rate']} </td>
                                <td> ${element['updated_on']} </td>
                                <td class="has-text-centered">
                                    <button class="button is-success" id="btn-map" onclick="showMap(${element['long']}, ${element['lat']})">
                                        <span class="icon is-small">
                                            <i class="fas fa-location-arrow"></i>
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