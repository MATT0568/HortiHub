$("#submit").on("click", function () {
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var info = {
        email: email,
        password: password
    }
    $.post("/validate", info, function (data) {
        if (data) {
            window.location = "/home";
        }
        else {
            $("#error").html("&nbsp;&nbsp;&nbsp;Incorrect email or password");
        }
    });
});
