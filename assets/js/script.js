var searchInputEl = $('#searchinput'); //select input box element
var searchInputBtn = $('#searchbtn'); //select submit button
var recipeDisplay = $('.body');


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
// var recipeCard = $('.callout')
// var recipeTitle = $('.title')
// var cookTime = $('.time')
// var recipeImg = $('.imgs')


function displayRecipes(recipes){
    console.log(recipes)
    // If user types wrong name, it should display "No results..."
    // if (recipes == 0 ){ 
    //     var noResults = document.createElement("h1")
    //     document.querySelector("#no-results").appendchild(noResults);
    //     noResults.textContent = "No Results... Try again";
    //     console.log(noResults)
    // }
    // else{
    
    // recipeDisplay.append($('<p>').text('balsfhasjfhdsjf'))
    for(var i=0; i<recipes.length; i++) { //displaying the recipe "card"
        // var recipeDisplay = recipeCard[i]
        // recipeDisplay.setAttribute("style", "display:block;")
        
        var recipe = recipes[i];
        // console.log(recipe)
        var recipeEl = $("<div>").attr({"class": "displayContainer"}).css({'border': '3px solid #466786','border-radius': '.3rem', 'background-color':'rgb(15, 144, 153)', 'height': '72%', 'padding': '10px', "width":"50%"})
        // console.log(recipeEl)
        var imgEl = $("<img>").attr({"class":"img", "src":recipe.image});
        recipeEl.append(imgEl);
        // console.log(imgEl)
        var titleEl = $("<h5>").attr({"class":"title"}).text(recipe.title);
        recipeEl.append(titleEl);
        // console.log(titleEl)
        var timeEl = $("<p>").attr({"class": "time"}).text("Cooking time: " + recipe.readyInMinutes + "mins");
        recipeEl.append(timeEl)
        console.log(timeEl)
        var buttonEl = $("<button>").attr({"id":"searchbtn"}).text("Add to Your Calendar");
        
        recipeEl.append(buttonEl)
        console.log(buttonEl)
        // buttonEl.on("click",addRecipeHandler)
        
        recipeDisplay.append(recipeEl)
        // recipeDisplay.append($('<p>').text('balsfhasjfhdsjf'))


        
        // console.log(recipe)
        // console.log(recipeEl)
        // console.log(imgEl)
        // console.log(titleEl)
        // console.log(timeEl)
        // console.log(buttonEl)
        
        // for(i=0; i < 11; i++){ //renders the recipe data to the "cards"
        //     // var recipes = data.results // This shows up as an error 
        //     recipeImg[i].src = recipes[i].image;
        //     recipeTitle[i].textContent = recipes[i].title;
        //     cookTime[i].textContent = "Cooking Time: " + recipes[i].readyInMinutes + "mins";
        //     console.log(recipes[i].image)
        //     // console.log(recipes[i].title)
        //     // console.log(recipes[i].readyInMinutes + "mins")

        //     //displays ingredients
        //     // let ingred = recipes[i].extendedIngredients.length
        //     // for(j=0; j < ingred; j++){
        //     //     var recipeIngredients = $('.ingredients')
        //     //     // recipeIngredients[i].textContent = "Ingredients: " // Figure out how to add the "Ingredients:" part
        //     //     recipeIngredients[i].innerHTML = recipes[i].extendedIngredients[j].original + "<br>";
        //     //     // console.log(recipes[i].extendedIngredients[j].original)
        //     // } 
        //     // displays step by step instructions
        //     // let instruct = recipes[i].analyzedInstructions[0].steps.length
        //     // for(n=0; n < instruct; n++){
        //     //     var recInstructions = $('.instructs')
        //     //     recInstructions[i].innerHTML = recipes[i].analyzedInstructions[0].steps[n].step + "<br>";
                
        //     //     console.log(recipes[i].analyzedInstructions[0].steps[n].step)
        //     // }
        // }
    // }
    }
};

// function addRecipeHandler(){

}

searchInputBtn.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked
