//--------------------------------------------------------
//--------------------------------------------------------
//    
//    TABLE OF CONTENTS:
//    FIND BREWEIES APP MAIN LOGIC
//    
//    FUNC 1 ** Create Select Options
//
//--------------------------------------------------------
//--------------------------------------------------------






//--------------------------------------------------------
//--------------------------------------------------------
//  FUNC 1
//  Create Select Options
//--------------------------------------------------------
//--------------------------------------------------------

function getLocation() {
    if (navigator.geolocation) {
        console.log("Ummmm?");
        navigator.geolocation.getCurrentPosition(getPostal, showError);
        console.log("work?");
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showBreweries(postals) {
    console.log(postals);
    var list;

    for (var i = 0; i < postals.postalCodes.length; i++) {
        console.log(i);
        var p = postals.postalCodes[i].postalCode;
        var idk = i;
        var url = "https://api.openbrewerydb.org/breweries?by_postal=" + p;
        console.log("why iterate here?");
        $.getJSON(url,
            function(response){
                console.log(postals.postalCodes[0]);
                // console.log(postals.postalCodes.length);

                //if no response, iterate
                if (response == "[]" && i == 0) {
                    document.getElementById("currCity").innerHTML = postals.postalCodes[i].placeName;
                    list = document.getElementById("current");
                    list.innerHTML = "There are no breweries in your city.";
                    console.log("no b");
                    return;
                }
                else if (response == "[]") {
                    console.log("no b");
                    return;
                }

                //starts the list
                if (i == 0) {
                    document.getElementById("currCity").innerHTML = postals.postalCodes[0].placeName;
                    list = document.getElementById("current");
                } else {
                    var city = postals.postalCodes[idk].placeName;
                    console.log(postals.postalCodes[idk].placeName);
                    console.log(idk);
                    list = document.getElementById("nearby");
                    list.innerHTML += "<h3>" + city + "</h3><ul>";
                }

                //loops through response and displays info for all breweries
                for (var j = 0; j < response.length; j++) {
                    // list.innerHTML += "<li>" + response[j].name + "</li>";
                    // list.innerHTML += "<ul>" +
                    //                     "<li>Brewery Type: " + response[j].brewery_type  + "</li>" +
                    //                     "<li>Phone Number: " + response[j].phone  + "</li>" +
                    //                     '<li><a href="' + response[j].website_url + '" target="_blank">Website</a></li>' +
                    //                 "</ul>"; 
                    console.log(response[j].name);
                }

                //closes the list
                if (i != 0) {
                    list.innerHTML += "</ul>";
                }
        });
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

function getPostal(position) {
    console.log("why?");

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    console.log("lat: " + lat);
    console.log("lon: " + lon);

    var url = "http://api.geonames.org/findNearbyPostalCodesJSON?lat=" + lat + "&lng=" + lon + "&username=bbgroff";
    $.getJSON(url,
        function(response){
            console.log(response);
            console.log(response.postalCodes[0]);
            showBreweries(response);
    });
}
 
 $(document).ready(function(){
    getLocation();
 });

//  getLocation();