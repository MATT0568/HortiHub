$("#submit").on("click", function() {
    console.log("HELLO");
    var userData = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
        first_name: $("#first_name").val().trim(),
        last_name: $("#last_name").val().trim()
    };

    $.post("/add/user/", userData, function (data) {
        if (data) {
            window.location = "/";
        }
        else {
            $("#error").html("INVALID INPUT");
        }
    });
});