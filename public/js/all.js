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
    <div class="plantcarebox w-clearfix">
      <div id="w-node-9ee3eaa882fa-93096ae1" class="userplantpicbox"><img id="plant-picture" src="${data[i].imgURL}" alt="" class="plantcareimg"><a href="#" class="userplantcarecancel w-button">Stop Caring For</a></div>
      <div id="w-node-5ba86fce021e-93096ae1" class="userplantinfo w-clearfix">
        <h3 class="userplantnamehead">Plant Name:</h3>
        <h4 class="userplantname">${data[i].commonName}</h4>
        <h4 class="timetocarehead">Next time to water:</h4>
        <h5 class="caretime">${nextWater}</h5>
        <h4 class="userplantlifespanhead">Life Span:</h4>
        <h5 class="heading-3">${data[i].duration}</h5>
        <div class="userplantinfoswitchbox w-form">
          <form id="email-form" name="email-form" data-name="Email Form" class="w-clearfix">
            <div class="userplantcheckbox w-clearfix w-checkbox"><input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="checkbox w-checkbox-input"><label for="checkbox" class="universalcheckboxlabel w-form-label">enable/disable notifications:</label></div>
          </form>
        </div>
      </div>
    </div>
    `);
    // $('#well-section').append(`
    // <br />
    //   <img src="${data[i].imgURL}" alt="plant-img" style="width: 200px; height: 200px"><br />
    //   Water Time: ${data[i].waterTime}<br />
    //   Common Name: ${data[i].commonName}<br />
    //   Scientific Name: ${data[i].scientificName}<br />
    //   Duration: ${data[i].duration}<br />
    //   Growth Rate: ${data[i].growthRate}<br />
    //   Growth Period: ${data[i].growthPeriod}<br />
    //   Flower Color: ${data[i].flowerColor}<br />
    //   Minimum Ph: ${data[i].phMin}<br />
    //   Maximum Ph: ${data[i].phMax}<br />
    //   Shade Tolerance: ${data[i].shadeTolerance}<br />
    //   Drought Tolerance: ${data[i].droughtTolerance}<br />
    //   Bloom Period: ${data[i].bloomPeriod}<br />
    //   Temperature Minimum: ${data[i].minTemp} Degrees Fahrenheit<br />
    //   Commercial Availability: ${data[i].commercialAvailability}<br />
    //   Start Time: ${data[i].createdAt}<br />
    //   Next Watering At: ${nextWater}
    // <br />
    // `);
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