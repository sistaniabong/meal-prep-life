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
            var recipes = data.results[i]
          displayRecipes(recipes);  //Calls function to display recipes
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to the API');
      });
  };

// Function to display the data from the API
var recipeCard = $('.callout')
var recipeTitle = $('.title')
var recipeIngredients = $('.ingredients')
var cookTime = $('.time')
var recipeImg = $('.img')
var recInstructions = $('.instructs')


function displayRecipes(recipes){
    

    for(i=0; i < recipeDisplay.length; i++) { //displaying the recipe "card"
        var recipeDisplay = recipeCard[i]
        recipeDisplay.setAttribute("style", "display:block;")
        
        
        for(i=0; i < recipes.length; i++){ //renders the recipe data to the "cards"
            var recipes = data.results[i]
            recipeTitle[i].textContent = recipes.title;
            cookTime[i].textContent = recipes.readyInMinutes;
            

        }
        

    }

 

}


searchInputBtn.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked
