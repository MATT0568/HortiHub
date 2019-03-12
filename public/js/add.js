var req = null;
var plant_url = "";
var plantData = {};
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
  var plant = $("#plant").val().trim();
  req = $.getJSON('./plant/' + plant, function (data) {
    plantData = data;
    plantData["waterTime"] = $("#water-plant").val().trim();
    $("#plant-details").append(`<br />
      <img src="${data.images[0].url}" alt="plant-img" style="width: 200px; height: 200px"><br />
      Common Name: ${data.common_name}<br />
      Scientific Name: ${data.scientific_name}<br />
      Life Duration: ${data.duration}<br />
      Growth Rate: ${data.main_species.specifications.growth_rate}<br />
      Growth Period: ${data.main_species.specifications.growth_period}<br />
      Flower Color: ${data.main_species.flower.color}<br />
      Minimum Ph: ${data.main_species.growth.ph_minimum}<br />
      Maximum Ph: ${data.main_species.growth.ph_maximum}<br />
      Shade Tolerance: ${data.main_species.growth.shade_tolerance}<br />
      Drought Tolerance: ${data.main_species.growth.drought_tolerance}<br />
      Bloom Period: ${data.main_species.seed.bloom_period}<br />
      Temperature Minimum: ${data.main_species.growth.temperature_minimum.deg_f} Degrees Fahrenheit<br />
      Commercial Availability: ${data.main_species.seed.commercial_availability}<br />
    `);
  });
});

$("#add-btn").on("click", function (event) {
  console.log(plantData);
  $.post("/api/new", plantData)
    .then(function (data) {
      alert("Adding plant...");
    });
  $("#name").val("");
});
