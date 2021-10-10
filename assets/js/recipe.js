var valEl = $('#value'); //select input value element

var searchBtnEl = $('#searchbtn')


var APIKey = "8jtm7TlN22DEZthcqa58FegSVmifcY9ldVQ4tx81P1Zi4vwR"; //API key for spoonacular
// var APIKeyReagin = "17f44d660ddb486fa6457a9e29671fd3";

// fx to get search value and call on searchRecipes() fx to make API call 
function searchInputHandler(event){
    event.preventDefault();

    var value = valEl.val();
    console.log(value);
    searchNutrition(value);
    valEl.val("");

}

var searchNutrition = function (value) {
    console.log('init search')
  
    var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=b2c2e357&app_key=c44b645c4ff77bb33f829e8a4beb2860&nutrition-type=cooking&ingr="+value;

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            $('#food').text(value);
            $('#cal').text(data.calories + " kcal");
            $('#weight').text(data.totalWeight + " g");
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to the API');
      });
  };



  searchBtnEl.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked
