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
            var recipes = data.results
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
var cookTime = $('.time')
var recipeImg = $('.imgs')


function displayRecipes(recipes){
    console.log(recipes)
    
    for(i=0; i<recipeCard.length; i++) { //displaying the recipe "card"
        var recipeDisplay = recipeCard[i]
        recipeDisplay.setAttribute("style", "display:block;")
        
        
        for(i=0; i < 11; i++){ //renders the recipe data to the "cards"
            // var recipes = data.results // This shows up as an error 
            recipeImg[i].src = recipes[i].image;
            recipeTitle[i].textContent = recipes[i].title;
            cookTime[i].textContent = recipes[i].readyInMinutes + "mins";
            // console.log(recipes[i].image)
            // console.log(recipes[i].title)
            // console.log(recipes[i].readyInMinutes + "mins")

            //displays ingredients
            let ingred = recipes[i].extendedIngredients.length
            for(j=0; j < ingred; j++){
                var recipeIngredients = $('.ingredients')
                recipeIngredients[i].innerHTML = recipes[i].extendedIngredients[j].original + "<br>";

                // console.log(recipes[i].extendedIngredients[j].original)
            } 
            // displays step by step instructions
            let instruct = recipes[i].analyzedInstructions[0].steps.length
            for(n=0; n < instruct; n++){
                var recInstructions = $('.instructs')
                recInstructions[i].innerHTML = recipes[i].analyzedInstructions[0].steps[n].step + "<br>";
                
                console.log(recipes[i].analyzedInstructions[n].steps[k].step)
                //display actual step by step instructions
                // var steps = recipes[i].analyzedInstructions[n].steps.length;
                // for (k=0; k<steps; k++){
                // recInstructions[i].innerHTML = recipes[i].analyzedInstructions[n].steps[k].step + "<br>";

                // console.log(recipes[i].analyzedInstructions[n].steps[k].step)
                // }
            }
        }
    }
};


searchInputBtn.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked
