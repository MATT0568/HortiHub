var req = null;
var plant_url = "";
$("#plant").on("keyup", function () {
  var plant = $("#plant").val().trim();
  if (plant.length > 2) {
    let dropdown = $('#add-plant');

    if (req != null) req.abort();
    dropdown.empty();

    dropdown.append('<option selected="true" disabled>Choose plant</option>');
    dropdown.prop('selectedIndex', 0);

    url_plant = plant;
    if (plant.includes("%")) {
      url_plant = plant.replace(/%/g, "%25");
    }

    req = $.getJSON('./axios/' + url_plant, function (data) {
      console.log("hello");
      $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.common_name).attr('data-index-number', key));
      })
    });
  }
});

// when user clicks add-btn
$("#add-btn").on("click", function (event) {
  event.preventDefault();

  // make a newCharacter obj
  var newPlant = {
    // name from name input
    name: $("#name").val().trim()
  };

  // send an AJAX POST-request with jQuery
  $.post("/api/new", newPlant)
    // on success, run this callback
    .then(function (data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Adding plant...");
    });

  // empty each input box by replacing the value with an empty string
  $("#name").val("");

});
