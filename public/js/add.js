var req = null;
var plant_url = "";
var plantData = {};
$("#searchfield").on("keyup", function () {
  var plant = $("#searchfield").val().trim();
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

    req = $.getJSON('./plants/' + url_plant, function (data) {
      $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.common_name).attr('data-index-number', key));
      })
    });
  }
});

$("#submit-plant").on("click", function (event) {
  event.preventDefault();
  $("#plant-details").empty();
  var plant = $("#searchfield").val().trim();
  req = $.getJSON('./plant/' + plant, function (data) {
    plantData = data;
    $("#plant-img").attr("src", data.images[0].url);
    $("#common-name").html(data.common_name);
    $("#scientific-name").html(data.scientific_name);
    $("#duration").append(data.duration);
    $("#growth-rate").append(data.main_species.specifications.growth_rate);
    $("#growth-period").append(data.main_species.specifications.growth_period);
    $("#color").append(data.main_species.flower.color);
    $("#minph").append(data.main_species.growth.ph_minimum);
    $("#maxph").append(data.main_species.growth.ph_maximum);
    $("#shade-tolerance").append(data.main_species.growth.shade_tolerance);
    $("#drought-tolerance").append(data.main_species.growth.drought_tolerance);
    $("#bloom-period").append(data.main_species.seed.bloom_period);
    $("#mintemp").append(data.main_species.growth.temperature_minimum.deg_f + "Degrees Fahrenheit");
    $("#availability").append(data.main_species.seed.commercial_availability);
  });
});

$("#add-btn").on("click", function (event) {
  plantData["waterTime"] = $("#water-plant").val().trim();
  console.log(plantData);
  $.post("/api/new", plantData)
    .then(function (data) {
      location.reload(true);
    });
  $("#name").val("");
});
