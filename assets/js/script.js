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
            localStorage.setItem("allRecipes", JSON.stringify(data.results));
            displayRecipes(recipes);//Calls function to display recipes
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
        var recipeEl = $("<div>").attr({"class": "displayContainer"}).css({'border': '3px solid #466786','border-radius': '.3rem', 'background-color':'rgb(149, 251, 172)', 'height': 'auto', 'padding': '10px', "width":"40%"})
        var imgEl = $("<img>").attr({"class":"img", "src":recipe.image});
        var titleEl = $("<h5>").attr({"class":"title"}).text(recipe.title);
        recipeEl.append(titleEl);
        // console.log(titleEl)
        var timeEl = $("<p>").attr({"class": "time"}).text("Cooking time: " + recipe.readyInMinutes + " mins");
        recipeEl.append(timeEl)
        // console.log(timeEl)

        var buttonEl = $("<button>").attr({"class":"addBtn","id":"btn-"+i}).text("Add to Your Calendar");
        
        recipeEl.append(imgEl, titleEl, timeEl, buttonEl);
        recipeDisplay.append(recipeEl)

        
        buttonEl.on("click",addRecipeHandler)
    }
    }

};


function addRecipeHandler(event){
  console.log('init addRecipeHandler');
  var id = event.currentTarget.id;
  var whichRecipe = id.split('-')[1];
  var recipeIndex = parseInt(whichRecipe);

  $('#btn-'+recipeIndex).attr({'data-open':"formModal"});

  $('.startBtn').on('click', function(){
    console.log('init user form')
    const recipes = (() => {
      const searchedRecipes = localStorage.getItem('searchedRecipes');
      return searchedRecipes === null ? []: JSON.parse(searchedRecipes);
    })();
    console.log(recipes)
    var name = $('#name').val();
    console.log(name)
    var day = $('#day').val();
    console.log(day)
    var allRecipes = JSON.parse(localStorage.getItem('allRecipes'));
    if (allRecipes){
      console.log('here')
      recipes.push({"name":name ,"day": day, "Recipe": allRecipes[recipeIndex]})
      localStorage.setItem("searchedRecipes", JSON.stringify(recipes));
    }
    location.href = './calendar.html';
  });
}


searchInputBtn.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked

