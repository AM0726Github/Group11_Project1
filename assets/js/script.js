// Search Parameter variables
var CurrentCity = document.getElementById('CurrentCity');
var LeavingDate = document.getElementById('LeavingDate');
var DestinationCity = document.getElementById('DestinationCity');
var BookingDate = document.getElementById('BookingDate');
var Adult = document.getElementById('adultCount');
var Children = document.getElementById('ChildCount');

// search button variable
var buttonSearch = document.getElementById('SearchButton');

// Result variables
var ResultContainer = document.getElementById('ResultCard');
var HotelName = document.getElementById('CardHeaderParagraff');
var ReviewsLink = document.getElementById('ReviewsAnchor');
var HotelcontentContanier = document.getElementById('HotelContent');
var HotelWebLink = document.getElementById('HotelWeb');





function getApiHotelsData() {
    var requestUrl = 'https://api.github.com/users?per_page=5';
    
    fetch("https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "hotels4.p.rapidapi.com",
                "x-rapidapi-key": "12dc6e8e9amsh96b553b9eb79259p1cc963jsndb586ba75532"
            }
        })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
        
};

buttonSearch.addEventListener('click', getApiHotelsData);
