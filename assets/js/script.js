var searchInputEl = $('#searchinput');
var searchInputBtn = $('#searchbtn');

var APIKey = '57ab872734244de8a87dcb2f4110abb7'


function searchInputHandler(event){
    event.preventDefault();
    var searchVal = searchInputEl.val();
    console.log(searchVal);
    searchRecipes(searchVal);

}

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

searchInputBtn.on('click',searchInputHandler);
