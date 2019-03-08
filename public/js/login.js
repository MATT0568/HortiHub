$("#submit").on("click", function () {
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var info = email + "," + password;
    $.get("/validate/" + info, function (data) {
        console.log(data);
    });
    // app.post('/', function (req, res) {
    //         if (!user) {
    //             res.render('login.jade', { error: 'Invalid email or password.' });
    //         } else {
    //             if (req.body.password === user.password) {
    //                 // sets a cookie with the user's info
    //                 req.session.user = user;
    //                 res.redirect('/dashboard');
    //             } else {
    //                 res.render('login.jade', { error: 'Invalid email or password.' });
    //             }
    //         }
    // });
});
