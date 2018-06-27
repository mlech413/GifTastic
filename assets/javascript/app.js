//--buttons already populated on screen
var topics = [
    "Australia",
    "Canada",
    "Costa Rica",
    "Ireland",
    "North Korea",
    "South Korea",
    "Madagascar",
    "Mozambique",
    "Russia",
    "Singapore",
    "Switzerland",
    "United States of America"
    ]

//--list of all other possible countries that user can add, used in validation later    
countries = [
"Afghanistan",
"Albania",
"Algeria",
"Andorra",
"Angola",
"Antigua",
"Argentina",
"Armenia",
// "Australia",
"Austria",
"Azerbaijan",
"Bahamas",
"Bahrain",
"Bangladesh",
"Barbados",
"Belarus",
"Belgium",
"Belize",
"Benin",
"Bhutan",
"Bolivia",
"Bosnia Herzegovina",
"Botswana",
"Brazil",
"Brunei",
"Bulgaria",
"Burkina",
"Burundi",
"Cambodia",
"Cameroon",
// "Canada",
"Cape Verde",
"Central African Republic",
"Chad",
"Chile",
"China",
"Colombia",
"Comoros",
"Congo",
"DOC",
// "Costa Rica",
"Croatia",
"Cuba",
"Cyprus",
"Czech Republic",
"Denmark",
"Djibouti",
"Dominica",
"Dominican Republic",
"East Timor",
"Ecuador",
"Egypt",
"El Salvador",
"Equatorial Guinea",
"England",
"Eritrea",
"Estonia",
"Ethiopia",
"Fiji",
"Finland",
"France",
"Gabon",
"Gambia",
"Georgia",
"Germany",
"Ghana",
"Greece",
"Grenada",
"Guatemala",
"Guinea",
"Guinea-Bissau",
"Guyana",
"Haiti",
"Honduras",
"Hungary",
"Iceland",
"India",
"Indonesia",
"Iran",
"Iraq",
// "Ireland",
"Israel",
"Italy",
"Ivory Coast",
"Jamaica",
"Japan",
"Jordan",
"Kazakhstan",
"Kenya",
"Kiribati",
// "North Korea",
// "South Korea",
"Kosovo",
"Kuwait",
"Kyrgyzstan",
"Laos",
"Latvia",
"Lebanon",
"Lesotho",
"Liberia",
"Libya",
"Liechtenstein",
"Lithuania",
"Luxembourg",
"Macedonia",
// "Madagascar",
"Malawi",
"Malaysia",
"Maldives",
"Mali",
"Malta",
"Marshall Islands",
"Mauritania",
"Mauritius",
"Mexico",
"Micronesia",
"Moldova",
"Monaco",
"Mongolia",
"Montenegro",
"Morocco",
// "Mozambique",
"Myanmar",
"Burma",
"Namibia",
"Nauru",
"Nepal",
"Netherlands",
"New Zealand",
"Nicaragua",
"Niger",
"Nigeria",
"Norway",
"Oman",
"Pakistan",
"Palau",
"Panama",
"Papua New Guinea",
"Paraguay",
"Peru",
"Philippines",
"Poland",
"Portugal",
"Qatar",
"Romania",
// "Russia",
"Rwanda",
"Saint Kitts",
"Saint Lucia",
"Saint Vincent",
"Samoa",
"San Marino",
"Sao Tome & Principe",
"Saudi Arabia",
"Senegal",
"Serbia",
"Seychelles",
"Sierra Leone",
// "Singapore",
"Slovakia",
"Slovenia",
"Solomon Islands",
"Somalia",
"South Africa",
"South Sudan",
"Spain",
"Sri Lanka",
"Sudan",
"Suriname",
"Swaziland",
"Sweden",
// "Switzerland",
"Syria",
"Taiwan",
"Tajikistan",
"Tanzania",
"Thailand",
"Togo",
"Tonga",
"Trinidad & Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Tuvalu",
"Uganda",
"Ukraine",
"United Arab Emirates",
"United Kingdom",
// "United States of America",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Vatican City",
"Venezuela",
"Vietnam",
"Yemen",
"Zambia",
"Zimbabwe"
]

//--populate country buttons from topics array
for (b=0; b<topics.length; b++) {
    $("#mainButtons").append("<button class='indivButtons' button-data='" + topics[b].toUpperCase() + "'>" + topics[b].toUpperCase() + "</button>");
};

// Click event for the buttons
$(".indivButtons").on("click", function() {

    //--clear out the gif display div
    $("#gif-display").html("<div></div>");
    
    var buttonSelected = $(this).attr("button-data");
    console.log("buttonSelected=" + buttonSelected);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonSelected + "&api_key=GqsPjeegNyqSdMkrzVwxW5DEBM3SlzkC&limit=10";
  
    // AJAX request for the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        // console.log(queryURL);
        // console.log(response);
        var results = response.data;
        // console.log("results=" + results);
        for (var i = 0; i < results.length; i++) {
            // $("<p>").text("Rating: " + results[i].rating);
            // var dispImage = $("<img>");
            // dispImage.attr("src", results[i].images.fixed_height_still.url);
            // dispImage.attr("data-still", results[i].images.fixed_height_still.url);
            // dispImage.attr("data-animate", results[i].images.fixed_height.url);
            // dispImage.attr("value", i);
            // dispImage.attr("data-state", "still");
            // dispImage.attr("class", "gif");
            // dispImage.attr("alt", "GIF image not loading");
            var dispImage = ( 
                "<img src='" + results[i].images.fixed_height_still.url + "' " +
                "data-still='" + results[i].images.fixed_height_still.url + "' " +
                "data-animate='" + results[i].images.fixed_height.url + "' " +
                "data-state='still' class='gif' alt='GIF image not loading'>" +
                "< Rating: " + results[i].rating + "&nbsp &nbsp");
            // $("#gif-display").append(p);
            $("#gif-display").append(dispImage);
          }
    });
});

//--text box to add a new country button
$("#add-a-button").on("click", function(event) {

    event.preventDefault();

    var newButton = $("#text-input").val().trim();
    newButton = newButton.toUpperCase();
    console.log("newButton=" + newButton);
    
    var validSelection = false;
    var alreadyUsed = false;

    //--check to make sure the country entered is a valid country
    for ( i=0; i < countries.length; i++) {        
        if (newButton == countries[i].toUpperCase()) {
            validSelection = true;
        }
    } 
    //--check if that country button is already on the screen
    for ( i=0; i < topics.length; i++) {
        if (newButton == topics[i].toUpperCase()) {
            alreadyUsed = true;
        }
    }
    //--if the added country is valid, and hasn't already been added, add the button to the screen
    if (validSelection && !alreadyUsed) {
        topics[i] = newButton;
    }

    //--alert if that button alreafy exists
    if (alreadyUsed) {
        alert("That country already has a button created.");
    }
    //--create a new button
    else if (validSelection) {
    $("#mainButtons").append("<button class='indivButtons' button-data='" + newButton + "'>" + newButton + "</button>");
    console.log("<button class='indivButtons' button-data='" + newButton + "'>" + newButton + "</button>");
    }
    //--alert if typed an invalid country
    else {
        alert("Please enter a valid country.");
    };

    // Click event for the buttons
    $(".indivButtons").on("click", function() {

        //--clear out the gif display div
        $("#gif-display").html("<div></div>");

        var buttonSelected = $(this).attr("button-data");
        console.log("buttonSelected=" + buttonSelected);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + "Funny " + buttonSelected + "&api_key=GqsPjeegNyqSdMkrzVwxW5DEBM3SlzkC&limit=10";

        // AJAX request for the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(queryURL);
            // console.log(response);
            var results = response.data;
            console.log("results=" + results);
            for (var i = 0; i < results.length; i++) {    
                // console.log(results[i].data.rating);
                // var dispImage = $("<img>");
                // dispImage.attr("src", results[i].images.fixed_height_still.url);
                // dispImage.attr("data-still", results[i].images.fixed_height_still.url);
                // dispImage.attr("data-animate", results[i].images.fixed_height.url);
                // dispImage.attr("value", i);
                // dispImage.attr("data-state", "still");
                // dispImage.attr("class", "gif");
                // dispImage.attr("alt", "GIF image not loading");
                var dispImage = ( 
                    "<img src='" + results[i].images.fixed_height_still.url + "' " +
                    "data-still='" + results[i].images.fixed_height_still.url + "' " +
                    "data-animate='" + results[i].images.fixed_height.url + "' " +
                    "data-state='still' class='gif' alt='GIF image not loading'>" +
                    "< Rating: " + results[i].rating + "&nbsp &nbsp");
                $("#gif-display").append(dispImage);
              }
        });
    });
});

//--start gif as still image, then animate if it is clicked
$(document).on("click", ".gif", function() {   
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
