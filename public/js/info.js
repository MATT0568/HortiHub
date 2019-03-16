const urlParams = new URLSearchParams(window.location.search);
var plantId = {
    id: parseInt(urlParams.get('id'))
};
console.log("@@@@@@@"+plantId.id);
$.post("/plantgetinfo", plantId, function (data) {
    $("#plant-img").attr("src", data.imgURL);
    $("#common-name").html(data.commonName);
    $("#scientific-name").html(data.scientificName);
    $("#duration").append(data.duration);
    $("#growth-rate").append(data.growthRate);
    $("#growth-period").append(data.growthPeriod);
    $("#color").append(data.flowerColor);
    $("#minph").append(data.phMin);
    $("#maxph").append(data.phMax);
    $("#shade-tolerance").append(data.shadeTolerance);
    $("#drought-tolerance").append(data.droughtTolerance);
    $("#bloom-period").append(data.bloomPeriod);
    $("#mintemp").append(data.minTemp + " Degrees Fahrenheit");
    $("#availability").append(data.commercialAvailability);
});