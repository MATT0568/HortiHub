$("#submit").on("click", function() {
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var info = email + "," + password;
    $.get("/validate/" + info, function(data) {
        console.log(data);
    });

});
