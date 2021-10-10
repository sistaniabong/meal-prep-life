

var getRecipeInfo = function(){
    var day = document.location.search;
   
    var recipeImg = day.split('=')[1];
    var recipeTitle = day.split('=')[1]
    var recipeCookTime = day.split('=')[i]
    var recipeIngred = day.split('=')[1]
    var recipeInstruct = day.split('=')[1]
    
    if (recipeTitle) {
        var title = $("</p>").textContent = recipeTitle;
        $("main").append(title)


    
        // getRepoIssues(repoName);
    } else {
    //     document.location.replace('./index.html');
    //   }
};