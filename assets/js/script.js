var userContainer = document.getElementById('users');
var fetchButton = document.getElementById('fetch-button');


function getApi() {
  var requestUrl = 'https://api.github.com/users?per_page=5';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      // Use the console to examine the response
      console.log(data);
      
      // TODO: Loop through the data and generate your HTML
      for(var i = 0; i < data.length; i++){

        console.log(data[i].login + ' Github link is ' + data[i].html_url);
        
        var newDiv = document.createElement("p");
        var newP = document.createElement("p");
        newP.textContent = ( data[i].html_url)
        newDiv.textContent = (data[i].login);
        userContainer.appendChild(newDiv);
        userContainer.appendChild(newP);

      }
    });
}
fetchButton.addEventListener('click', getApi);


