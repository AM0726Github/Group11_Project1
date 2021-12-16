// Search Parameter variables
var LeavingDate = document.getElementById('LeavingDate');
var DestinationCity = document.getElementById('DestinationCity');
var BookingDate = document.getElementById('BookingDate');
var Adult = document.getElementById('adultCount');
var Children = document.getElementById('ChildCount');
var currency = document.getElementById('curency');
var price = document.getElementById('price');

// search button variable
var buttonSearch = document.getElementById('SearchButton');

// Result variables
var ResultContainer = document.getElementById('ResultCard');
var HotelName = document.getElementById('CardHeaderParagraff');
var ReviewsLink = document.getElementById('ReviewsAnchor');
var HotelcontentContanier = document.getElementById('HotelContent');
var HotelWebLink = document.getElementById('HotelWeb');

// curency & local variables
var curr = 'en_US';
var loc = 'USD';
// parse Currency by Api format
function checkCurrency(curr,loc) {
    
    if(currency.value === '$'){
        curr = 'en_US';
        loc = 'USD';
    } else if(currency.value === '€'){
        curr = 'de-DE';
        loc = 'EUR';
    };
};



// Get destination city id from rapid api
function getCityDestination() {
    
    checkCurrency(curr,loc);


    fetch("https://hotels4.p.rapidapi.com/locations/v2/search?query=" + DestinationCity.value + "&locale=" + curr + "&currency=" + loc, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": "12dc6e8e9amsh96b553b9eb79259p1cc963jsndb586ba75532"
        }
    })
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function (data){
        
            var city = data.suggestions[0].entities[0].destinationId;
            
            getApiHotelsData(city);
            });
        };

    });
};

//get  destination city hotels by using rapid api hotels
function getApiHotelsData(city) {
        
    fetch("https://hotels4.p.rapidapi.com/properties/list?destinationId=" + city + "&pageNumber=1&pageSize=25&checkIn=" 
            + LeavingDate.value + "&checkOut=" + BookingDate.value + "&adults1=" + Adult.value + "&children1="
            + Children.value +"&priceMin" + price.value + "&sortOrder=PRICE&locale=" + curr + "&currency=" + loc, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hotels4.p.rapidapi.com",
                "x-rapidapi-key": "12dc6e8e9amsh96b553b9eb79259p1cc963jsndb586ba75532"
            }
        })
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    console.log(data);
        
                    for(var i=0; i<20; ++i ){
                        console.log("Hotel Name  " + data.data.body.searchResults.results[i].name);
                        console.log("Hotel ID  " + data.data.body.searchResults.results[i].id);
                        console.log("Hotel Raiting  " + data.data.body.searchResults.results[i].guestReviews.rating);
                        console.log("Hotel Address  " + data.data.body.searchResults.results[i].address.streetAddress);
                        console.log("Hotel Coordinates Lat: " + data.data.body.searchResults.results[i].coordinate.lat + " Lon: " + data.data.body.searchResults.results[i].coordinate.lon);
                    
                    };
        

                });   
            };
        });
};

buttonSearch.addEventListener('click', getCityDestination);