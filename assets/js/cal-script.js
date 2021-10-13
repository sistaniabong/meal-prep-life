// elements selector
var userHeaderEl = $('.header');
var userNameHeaderEl = $('#userMealPlan');
var currentDayEl = $('#currentDay');



// fx that highlights current day on the calendar
function selectToday(){
    var today = moment().format('dddd');
    $(".accordion-title."+today.toLowerCase()).parent().css({'background':'thistle'});
    // display current day and date on the header
    setInterval(function(){
        var rightNow = moment().format('dddd, MMMM Do YYYY');
        currentDayEl.text(rightNow).css({"color":"lightslategrey", "font-size":"40px","padding-bottom": "30px", "font-family": "Caveat"});
    },0);
}

// fx that render user's name on the header and saved recipes on the selected day
function populateCal(){
    // retrieving scores from the local storage
    var recipes = JSON.parse(localStorage.getItem('searchedRecipes'));
    if (recipes){
        var userName = recipes[0].name
        userNameHeaderEl.text(userName +"'s Meal Planner").css({"color":"lightslategrey","padding-top": "50px", "font-family": "Caveat", "font-size":"60px"});
        var recipes = JSON.parse(localStorage.getItem('searchedRecipes'));
        console.log(recipes)
        for (var i=0;i<recipes.length;i++){
            var recipe = recipes[i];
            var selectedDay = recipe.day;
            var recipeTitle = recipe.Recipe.title;
            var content = $(".accordion-title."+selectedDay.toLowerCase()).siblings();
            content.append($('<button>').attr({'class':"recipeBtn",'id': "btn-"+i, 'data-open':"recipeModal"}).text(recipeTitle));
            
        }
    }
}

// fx that reveal modal with the preview of the recipe when the recipe button is clicked
function previewRecipe(event){
    var id = event.currentTarget.id;
    var whichRecipe = id.split('-')[1];
    var recipeIndex = parseInt(whichRecipe);
    console.log(recipeIndex)
    var recipes = JSON.parse(localStorage.getItem('searchedRecipes'));
    var recipe = recipes[recipeIndex].Recipe;
    console.log(recipe)  
    $('#recipeImg').attr({"src":recipe.image});
    $('#title').text(recipe.title).css({'font-size':'30px','font-weight':"bold"});
    $('#time').text("Cooking Time: "+recipe.readyInMinutes+" mins").css({'font-size':'20px', 'color':'lightslategrey'});
    $('#servings').text("Servings: "+recipe.servings).css({'font-size':'20px', 'color':'lightslategrey'});
    $('.startBtn').attr({'id':recipeIndex});
    
}

// fx that redirects the user to the selected recipe detail page by passing in the index of the selected recipe
function redirectHandler(event){
    var recipeIndex = event.currentTarget.id;
    location.href = './recipe.html?recipe=' + recipeIndex;
}



selectToday();
populateCal();
$('.recipeBtn').on('click', previewRecipe); //click event listener triggered when the user clicks the recipe button to preview the recipe
$('.startBtn').on('click',redirectHandler); //click event listener triggered when the user clicks the "Start Cooking" button
