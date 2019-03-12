$.get("/db", function (data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var startDate = moment(data[i].createdAt);
    var startDateConv = moment(startDate, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(startDateConv), "hours");

    var tRemainder = diffTime % data[i].waterTime;
    var tHoursTillWater = data[i].waterTime - tRemainder;

    var nextWater = moment().add(tHoursTillWater, "hours");
    nextWater = moment(nextWater).format("DD/MM/YYYY HH:mm:ss a");
    console.log(nextWater);
    $('#well-section').append(`
    <br />
      <img src="${data[i].imgURL}" alt="plant-img" style="width: 200px; height: 200px"><br />
      Water Time: ${data[i].waterTime}<br />
      Common Name: ${data[i].commonName}<br />
      Scientific Name: ${data[i].scientificName}<br />
      Duration: ${data[i].duration}<br />
      Growth Rate: ${data[i].growthRate}<br />
      Growth Period: ${data[i].growthPeriod}<br />
      Flower Color: ${data[i].flowerColor}<br />
      Minimum Ph: ${data[i].phMin}<br />
      Maximum Ph: ${data[i].phMax}<br />
      Shade Tolerance: ${data[i].shadeTolerance}<br />
      Drought Tolerance: ${data[i].droughtTolerance}<br />
      Bloom Period: ${data[i].bloomPeriod}<br />
      Temperature Minimum: ${data[i].minTemp} Degrees Fahrenheit<br />
      Commercial Availability: ${data[i].commercialAvailability}<br />
      Start Time: ${data[i].createdAt}<br />
      Next Watering At: ${nextWater}
    <br />
    `);
    // create a parent div for the oncoming elements
    // var wellSection = $("<div>");
    // // add a class to this div: 'well'
    // wellSection.addClass("well");
    // // add an id to the well to mark which well it is
    // wellSection.attr("id", "plant-well-" + i);
    // // append the well to the well section
    // $("#well-section").append(wellSection);

    // // Now add all of our plant data to the well we just placed on the page
    // $("#plant-well-" + i).append("<h2>" + data[i].name + "</h2>");
    // // the role an h3,
    // $("#plant-well-" + i).append("<h3>Role: " + data[i].role + "</h4>");
    // // the age an h3,
    // $("#plant-well-" + i).append("<h3>Age: " + data[i].age + "</h4>");

    // // make the name an h2,
    // $("#plant-well-" + i).append("<h2>" + data[i].name + "</h2>");
  }
});