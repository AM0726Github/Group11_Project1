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
var result = document.getElementById('Result-hotel');
var HotelName = document.getElementById('CardHeaderParagraff');
var ReviewsLink = document.getElementById('ReviewsAnchor');
var HotelcontentContanier = document.getElementById('HotelContent');
var HotelWebLink = document.getElementById('HotelWeb');
var resultCount = 0;
var photoUrl = "../Images/notFound.png";
var HottelIDs = [];
var hottels = [
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
    { name:'',id:'',raiting:'',address:'',lat:'',lon:'',photo:'' },
]

// 12dc6e8e9amsh96b553b9eb79259p1cc963jsndb586ba75532

// curency & local variables
var curr = 'en_US';
var loc = 'USD';

// Dinamic change vars
let div = document.createElement("div");
let article = document.createElement("article");
let header = document.createElement("header");

var elem = document.createElement("img");

let p1 = document.createElement("p");
let p2 = document.createElement("p");
let p3 = document.createElement("p");

let button = document.createElement("button");














// Get destination city id from rapid api
function getCityDestination() {
    
    // parse Currency by Api format
    if(currency.value != "$"){
        curr = 'de-DE';
        loc = 'EUR';
    } else {
        curr = 'en_US';
        loc = 'USD';
    }

    fetch("https://hotels4.p.rapidapi.com/locations/v2/search?query=" + DestinationCity.value + "&locale=" + curr + "&currency=" + loc, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": "afdf47149amsh7cf7cb2b83826cap10ce49jsn137fc79378f3"
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

var hotelID = '';

// 363464

var Url = "./assets/Images/notFound.png";

//get hottel picture
function getHottelPicture(hotelID) {

    Url = "./assets/Images/notFound.png"

    fetch("https://hotels-com-provider.p.rapidapi.com/v1/hotels/photos?hotel_id="+ hotelID, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
            "x-rapidapi-key": "afdf47149amsh7cf7cb2b83826cap10ce49jsn137fc79378f3"
        }
    })
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                
                // return data.
                // var sufixx = data.hotelImages[0].sizes[0].suffix;
                // var baseurl = data.hotelImages[0].baseUrl;
            
                // creating working URL
                // baseurl = baseurl.substring(0,baseurl.length-10);
                // Url = baseurl + sufixx + ".jpg";
               
                Url =  data[0].mainUrl;

                elem.setAttribute("src", Url);
                elem.setAttribute("height", "auto");
                elem.setAttribute("width", "600px");
                HotelcontentContanier.appendChild(elem);
            });

        };
    });                
    
};



//get  destination city hotels by using rapid api hotels
function getApiHotelsData(city) {
        
    fetch("https://hotels4.p.rapidapi.com/properties/list?destinationId=" + city + "&pageNumber=1&pageSize=" + 1 + "&checkIn=" 
            + LeavingDate.value + "&checkOut=" + BookingDate.value + "&adults1=" + Adult.value + "&children1="
            + Children.value +"&priceMin" + price.value + "&sortOrder=PRICE&locale=" + curr + "&currency=" + loc, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hotels4.p.rapidapi.com",
                "x-rapidapi-key": "afdf47149amsh7cf7cb2b83826cap10ce49jsn137fc79378f3"
            }
        })
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    
                    resultCount = data.data.body.searchResults.results.length;
        
                    for(var i=0; i < resultCount; ++i ){

                        hottels[i].id = data.data.body.searchResults.results[i].id;
                        hottels[i].name = data.data.body.searchResults.results[i].name;
                        hottels[i].raiting = data.data.body.searchResults.results[i].guestReviews.raiting;
                        hottels[i].address = data.data.body.searchResults.results[i].address.streetAddress;
                        hottels[i].lat = data.data.body.searchResults.results[i].coordinate.lat;
                        hottels[i].lon = data.data.body.searchResults.results[i].coordinate.lon;
                        getHottelPicture(hottels[i].id);

                        result.classList.remove("d-none");

                        p1.textContent = hottels[i].name;
                        HotelName.appendChild(p1);
                        
                        p2.textContent = "Raiting  " + hottels[i].raiting;
                        ReviewsLink.appendChild(p2);

                        p3.textContent = "Address  " + hottels[i].address;
                        HotelcontentContanier.appendChild(p3);
                        
                        hottels[i].photo = Url;
                        
                       
                        
                        

                    };

                });

            };   
        });
};



buttonSearch.addEventListener('click', getCityDestination);
