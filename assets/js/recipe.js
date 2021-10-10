var displayRecipe = $("#recipedisplay")
var titleDisplay = $("#titledisplay")
var imgDisplay = $("#imagedisplay")
var timeDisplay = $("#timedisplay")

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
    var recipeInstruct = recipeToDisplay.Recipe.analyzedInstructions
    console.log(recipeIngred)

    titleDisplay.text(recipeTitle);
    imgDisplay.attr({"src":recipeImg});
    timeDisplay.text("Cooking time: " + recipeCookTime + "mins")
    displayRecipe.append(titleDisplay, imgDisplay, timeDisplay)

    for (var i=0; i<recipeIngred.length; i++){
        recipeIngredients = recipeIngred[i].original
        var showIngred = $("<input>").attr({"type":"checkbox"}).css({"display":"inline-block"}).text(recipeIngredients)
        displayRecipe.append(showIngred);
        console.log(recipeIngredients)
    }




    
    // var recipeIngred = 
    // var recipeInstruct = 
    console.log(recipeNum)
// console.log(localStorage.searchedRecipes)
    // if (recipeTitle) {
    //     var title = $("</p>").textContent = recipeTitle;
    //     $("main").append(title)

    //when displaying the recipe add type of checkbox
    

    
    //     // getRepoIssues(repoName);
    // } 
    // else {
    //     document.location.replace('./index.html');
    //   }
};

getRecipeInfo();