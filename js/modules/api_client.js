var settings = {
    "url": null,
    "method": null,
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "success": null,
    "error": null
};


export function callAPI(endpoint, method, data = null, successCallBack, errorCallBack) {
    settings["url"] = "http://victim.live:3000/" + endpoint;
    settings['method'] = method;

    if (! data) {}
    else{
        settings['data'] = JSON.stringify(data);
        console.log("NULL");
    }

    console.log(data);
    settings['success'] = function (data, textStatus, jqXHR) {
        successCallBack(data, textStatus, jqXHR);
    }
    settings['error'] = function (jqXHR, textStatus, errorThrown) {
        errorCallBack(errorThrown, textStatus, jqXHR);
    }

    $.ajax(settings);
}