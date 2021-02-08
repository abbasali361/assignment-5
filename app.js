const searchButton = document.getElementById('search-btn');
const mealListItem = document.getElementById('meal');
const mealDetails = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listener for food List
searchButton.addEventListener('click', getMealList);
mealListItem.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetails.parentElement.classList.remove('showRecipe');
});

// get meal list ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img class = "recipe-btn" src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            mealListItem.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find your meal!";
            mealListItem.classList.add('notFound');
        }

        mealListItem.innerHTML = html;
    });
}

// get the meals
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a meals function
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
         <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strIngredient1}</p>
            <p>${meal.strIngredient2}</p>
            <p>${meal.strIngredient3}</p>
            <p>${meal.strIngredient4}</p>
            <p>${meal.strIngredient5}</p>
            <p>${meal.strIngredient6}</p>
            <p>${meal.strIngredient7}</p>
            <p>${meal.strIngredient8}</p>
            <p>${meal.strIngredient9}</p>
            <p>${meal.strIngredient10}</p>
            <p>${meal.strIngredient11}</p>
        </div>
    `;
    mealDetails.innerHTML = html;
    mealDetails.parentElement.classList.add('showRecipe');
}