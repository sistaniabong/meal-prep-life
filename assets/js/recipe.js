var valEl = $('#value'); //select input value element
var searchBtnEl = $('#analyzebtn')
var APIKey = "8jtm7TlN22DEZthcqa58FegSVmifcY9ldVQ4tx81P1Zi4vwR"; //API key for Edamame Nutrition API

// fx to get search value and call on searchRecipes() fx to make API call 
function searchInputHandler(event){
    event.preventDefault();
    var value = valEl.val();
    searchNutrition(value); //passing in search value to fx searchNutrition
    valEl.val("");
}

// fx that make API request to Edamame Nutrition Analysis API
var searchNutrition = function (value) {
    console.log('init search nutrition')
    var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=b2c2e357&app_key=c44b645c4ff77bb33f829e8a4beb2860&nutrition-type=cooking&ingr="+value;
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if(data.totalWeight === 0 && data.calories === 0){
                $("#errormessage").text("*Please type in a valid unit ex.(1 cup of rice)").css({"color":"red"})
                $('#food').text("");
                $('#cal').text("");
                $('#weight').text("");
            } else {
                $("#errormessage").text("");
                $('#food').text(value);
                $('#cal').text(data.calories + " kcal");
                $('#weight').text(data.totalWeight + " g");
            }
          });
        }
      })
      .catch(function (error) {
        $("#errormessage").text('Unable to connect to the API'); 
      });
  };


searchBtnEl.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked


// Selecting all the necessary elements to display the recipe detail info
var displayRecipe = $("#recipedisplay")
var titleDisplay = $("#titledisplay")
var imgDisplay = $("#imagedisplay")
var timeDisplay = $("#timedisplay")
var ingredContainer = $("#foringredients")
var instructContainer = $("#forinstructions")

// fx that renders the recipe detail info on recipe page
var getRecipeInfo = function(){
    var getRecipes = JSON.parse(localStorage.getItem('searchedRecipes'));
    var recipeToDisplay = document.location.search; //grab the recipe index that is passed from calendar.html
    var recipeNum = recipeToDisplay.split('=')[1]
    recipeToDisplay = getRecipes[recipeNum] //using the recipe index to grab the selected recipe from the local storage
    
    // getting data from local storage
    var recipeTitle = recipeToDisplay.Recipe.title
    var recipeCookTime = recipeToDisplay.Recipe.readyInMinutes
    var recipeImg = recipeToDisplay.Recipe.image
    var recipeIngred = recipeToDisplay.Recipe.extendedIngredients
    var recipeInstruct = recipeToDisplay.Recipe.analyzedInstructions[0].steps

    // render recipe title, image, and cooking time
    titleDisplay.text(recipeTitle).css({"font-family": "Caveat", "font-size": "40px", "margin-top": "10px"});
    imgDisplay.attr({"src":recipeImg})
    timeDisplay.text("Cooking time: " + recipeCookTime + "mins");
    displayRecipe.append(titleDisplay, imgDisplay, timeDisplay);

    //rendering Ingredients with checkboxes
    for (var i=0; i<recipeIngred.length; i++){
        var recipeIngredients = recipeIngred[i].original
        var showCheckbox = $("<input>").attr({"type":"checkbox", "class":"ingredcheckbox"}).css({"margin-right":"5px"})
        var showIngred = $("<label>").css({"display":"block"}).innerHTML = recipeIngredients + "<br/>"
        ingredContainer.append(showCheckbox, showIngred);
    }
    
    for (var i=0; i<recipeInstruct.length; i++){
        var instructions = recipeInstruct[i].step
        var showCheckbox = $("<input>").attr({"type":"checkbox", "class":"instructcheckbox"}).css({"margin-right":"5px"})
        var showInstruct = $("<label>").css({"display":"block"}).innerHTML = instructions + "<br/>"
        instructContainer.append(showCheckbox, showInstruct)
    }

};

getRecipeInfo();

