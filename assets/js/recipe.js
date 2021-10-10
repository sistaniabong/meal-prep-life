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
    

    titleDisplay.text(recipeTitle);
    imgDisplay.attr({"src":recipeImg});
    timeDisplay.text("Cooking time: " + recipeCookTime + "mins")
    displayRecipe.append(titleDisplay, imgDisplay, timeDisplay)

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