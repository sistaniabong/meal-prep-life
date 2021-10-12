var userHeaderEl = $('.header');
var userNameHeaderEl = $('#userMealPlan');
var currentDayEl = $('#currentDay');


function displayHeader(){
    var recipes = JSON.parse(localStorage.getItem('searchedRecipes'));
    var userName = recipes[0].name
    userNameHeaderEl.text(userName +"'s Meal Planner").css({"color":"lightslategrey","padding-top": "50px", "font-family": "Caveat", "font-size":"60px"});
}

// date display on the header
setInterval(function(){
    var rightNow = moment().format('dddd, MMMM Do YYYY');
    currentDayEl.text(rightNow).css({"color":"lightslategrey", "font-size":"40px","padding-bottom": "30px", "font-family": "Caveat"});
},0);

function selectToday(){
    
    var today = moment().format('dddd');
    console.log(today.toLowerCase());
    console.log($(".accordion-title."+today.toLowerCase()).parent());
    console.log($(".accordion-title."+today.toLowerCase()).siblings());
    $(".accordion-title."+today.toLowerCase()).parent().css({'background':'yellow'});

}


function populateCal(){
    // retrieving scores from the local storage
    var recipes = JSON.parse(localStorage.getItem('searchedRecipes'));
    console.log(recipes)
    for (var i=0;i<recipes.length;i++){
        var recipe = recipes[i];
        var selectedDay = recipe.day;
        var recipeTitle = recipe.Recipe.title;
        var content = $(".accordion-title."+selectedDay.toLowerCase()).siblings();
        // content.append($('<button>').attr({'class':"recipeBtn",'id': selectedDay+"Btn", 'data-open':"recipeModal"}).text(recipeTitle));
        content.append($('<button>').attr({'class':"recipeBtn",'id': "btn-"+i, 'data-open':"recipeModal"}).text(recipeTitle));
        
    }
}

function previewRecipe(event){
    var id = event.currentTarget.id;
    // var day = dayID.split('Btn')[0];
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

function redirectHandler(event){
    var recipeIndex = event.currentTarget.id;
    location.href = './recipe.html?recipe=' + recipeIndex;
}



displayHeader();
selectToday();
populateCal();
$('.recipeBtn').on('click', previewRecipe);
$('.startBtn').on('click',redirectHandler);
