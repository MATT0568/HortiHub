$("#submit").on("click", function () {
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var info = email + "," + password;
    $.post("/validate/" + info, function (data) {
        if (data) {
            console.log("true");
            window.location = "/all";
        }
    });
});
