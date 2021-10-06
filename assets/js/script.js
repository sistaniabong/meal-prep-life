var searchInputEl = $('#searchinput'); //select input box element
var searchInputBtn = $('#searchbtn'); //select submit button


var APIKey = '57ab872734244de8a87dcb2f4110abb7'; //API key for spoonacular

// fx to get search value and call on searchRecipes() fx to make API call 
function searchInputHandler(event){
    event.preventDefault();
    var searchVal = searchInputEl.val();
    console.log(searchVal);
    searchRecipes(searchVal);

}

// fx that makes API call based on the input search value
var searchRecipes = function (value) {
    console.log()
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + value + "&addRecipeInformation=true" + "&fillIngredients=true" + "&apiKey=" + APIKey;
  
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to the API');
      });
  };

searchInputBtn.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked
