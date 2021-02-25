$(document).ready(function () {
    import("./modules/api_client.js").then((api_client) => {
        api_client.callAPI(
            "users",
            "GET",
            null,
            function (data, textStatus, jqXHR) {
                console.log(jqXHR.status + " : " + textStatus);
                data.forEach(element => {
                    $("#users-container")
                        .append(`<tr> 
                                <td> ${element['id']} </td> 
                                <td> ${element['id_number']} </td>
                                <td> ${element['name']} </td>
                                <td> ${element['email']} </td>
                                <td> ${element['phone']} </td>
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