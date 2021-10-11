var searchInputEl = $('#searchinput'); //select input box element
var searchInputBtn = $('#searchbtn'); //select submit button
var recipeDisplay = $('.recipe-display');


var APIKey = "49c0740aebdf47ebacf6832cdff2c7c4"; //API key for spoonacular
var APIKeyReagin = "17f44d660ddb486fa6457a9e29671fd3";
// fx to get search value and call on searchRecipes() fx to make API call 
function searchInputHandler(event){
    event.preventDefault();
    var searchVal = searchInputEl.val();
    console.log(searchVal);
    searchRecipes(searchVal);
}

// fx that makes API call based on the input search value
var searchRecipes = function (value) {
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + value + "&addRecipeInformation=true" + "&fillIngredients=true" + "&apiKey=" + APIKeyReagin;
  
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            var recipes = data.results
          displayRecipes(recipes);
          saveLocalStorage(data);  //Calls function to display recipes
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to the API');
      });
  };


function displayRecipes(recipes){
    console.log(recipes)
    // If user types wrong name, it should display "No results..."
    if (recipes == 0 ){ 
        $("#no-results").css({"display":"inline", "font-size":"50px"})
        // $("#no-resultsimg").src("")  //figure out how to add img
        recipeDisplay.remove();
        searchInputEl.empty(); //should empty the search bar

    }
    else {
    recipeDisplay.empty();
    for(var i=0; i<recipes.length; i++) { //displaying the recipe "card"
        $("#no-results").empty();
        var recipe = recipes[i];
        var recipeEl = $("<div>").attr({"class": "displayContainer"}).css({'border': '3px solid #466786','border-radius': '.3rem', 'background-color':'rgb(255, 217, 181)', 'height': 'auto', 'padding': '10px', "width":"40%", "margin-bottom": "3%"})
        var imgEl = $("<img>").attr({"class":"img", "src":recipe.image});
        var titleEl = $("<h5>").attr({"class":"title"}).text(recipe.title);
        recipeEl.append(titleEl);
        // console.log(titleEl)
        var timeEl = $("<p>").attr({"class": "time"}).text("Cooking time: " + recipe.readyInMinutes + " mins");
        recipeEl.append(timeEl)
        // console.log(timeEl)

        var buttonEl = $("<button>").attr({"id":"searchbtn"}).text("Add to Your Calendar");
        
        recipeEl.append(imgEl, titleEl, timeEl, buttonEl);
        recipeDisplay.append(recipeEl)

        
        // buttonEl.on("click",addRecipeHandler)
        
    }
    }

};

function saveLocalStorage(data){
    const recipes = (() => {
        const searchedRecipes = localStorage.getItem('searchedRecipes');
        return searchedRecipes === null ? []: JSON.parse(searchedRecipes);
      })();
    
    recipes.push({"name": "Sistania","day": "Saturday", "Recipe": data.results[0]})
    
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("searchedRecipes", JSON.stringify(recipes));

}

// function addRecipeHandler(){
// 
// }


searchInputBtn.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked



