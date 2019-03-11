var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;
var session = require('client-sessions');
var cookieParser = require('cookie-parser');
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
  // httpOnly: true,
  // secure: true,
  // ephemeral: true
}));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});