var valEl = $('#value'); //select input value element

var searchBtnEl = $('#analyzebtn')


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

    var apiError = $("#errormessage").text('Unable to connect to the API'); 
    var errorMess = $("#errormessage").text("*Please type in a valid unit ex.(1 cup of rice)").css({"color":"red"})

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            if(data.totalWeight === 0 && data.calories === 0){
                errorMess
                $('#food').text("");
                $('#cal').text("");
                $('#weight').text("");
            } else {
                errorMess.empty();
                $('#food').text(value);
                $('#cal').text(data.calories + " kcal");
                $('#weight').text(data.totalWeight + " g");
            }
            // errorMess.empty();
            // apiError.empty();
          });
        }
      })
      .catch(function (error) {
        apiError
      });
  };


searchBtnEl.on('click',searchInputHandler); //click event handler that calls on searchInputHandler when the submit button is clicked


var displayRecipe = $("#recipedisplay")
var titleDisplay = $("#titledisplay")
var imgDisplay = $("#imagedisplay")
var timeDisplay = $("#timedisplay")
var ingredContainer = $("#foringredients")
var instructContainer = $("#forinstructions")

var getRecipeInfo = function(){
    var getRecipes = JSON.parse(localStorage.getItem('searchedRecipes'));
    var recipeToDisplay = document.location.search;
    var recipeNum = recipeToDisplay.split('=')[1]
    recipeToDisplay = getRecipes[recipeNum]
    
    // getting data from local storage
    var recipeTitle = recipeToDisplay.Recipe.title
    var recipeCookTime = recipeToDisplay.Recipe.readyInMinutes
    var recipeImg = recipeToDisplay.Recipe.image
    var recipeIngred = recipeToDisplay.Recipe.extendedIngredients
    var recipeInstruct = recipeToDisplay.Recipe.analyzedInstructions[0].steps

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

