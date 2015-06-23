$(document).ready(function () {
    //Server variable
    var proxy = $.connection.progressBars;
    var updateProgressBars = true;

    $.connection.hub.logging = true;

    //Server functions
    proxy.client.startProgressBars = function (a, b, c, d) {
        if (updateProgressBars == true) {
            //Update progress bars
            $("#a").attr("aria-valuenow", a);
            $("#a").attr("style", "width: " + a + "%");

            $("#b").attr("aria-valuenow", b);
            $("#b").attr("style", "width: " + b + "%");

            $("#c").attr("aria-valuenow", c);
            $("#c").attr("style", "width: " + c + "%");

            $("#d").attr("aria-valuenow", d);
            $("#d").attr("style", "width: " + d + "%");
        }
    }

    StopProgressBars = function () {
        $("#a").attr("aria-valuenow", "0").attr("style", "width: 0%;");
        $("#b").attr("aria-valuenow", "0").attr("style", "width: 0%;");
        $("#c").attr("aria-valuenow", "0").attr("style", "width: 0%;");
        $("#d").attr("aria-valuenow", "0").attr("style", "width: 0%;");
        $.connection.hub.stop();
    }

    proxy.client.updateConnections = function (e) {
        $("#connections").html(e);
    }

    $("#button").click(function () {
        if ($(this).html() == "Start") {
            if ($.connection.hub && $.connection.hub.state == 4) {
                $.connection.hub.start().done(function () {
                    $(this).html("Stop");
                    updateProgressBars = true;
                    proxy.server.startProgressBars();
                });
            }

            updateProgressBars = true;
            $(this).html("Stop");
            proxy.server.startProgressBars();
        }
        else {

            updateProgressBars = false;
            StopProgressBars();
            $(this).html("Start");
        }
    });

    //Hub connected
    $.connection.hub.start()
    .done(function (reason) {
        $("#loading").removeClass("alert-warning").addClass("alert-success");
        $("#loading p").html("Loaded!");
        $("#button").removeClass("disabled");
    })
    .fail(function (reason) {
        $("#loading").removeClass("alert-warning").addClass("alert-danger");
        $("#loading p").html("Error loading service - " + reason);
    });
});