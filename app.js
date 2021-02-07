const getMeal = document.getElementById('get-meal');
        document.getElementById('search-button').addEventListener('click', function () {
            const inputValue = document.getElementById('search-input').value;
            loadData(inputValue);
        });

        function loadData(inputValue) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`)
                .then(promise => promise.json())
                .then(data => dataShow(data.meals));
        };
        const bodyContent = document.getElementById('main-body');
        function dataShow(data) {
            for (let i = 0; i < data.length; i++) {
                const mealItem = data[i];
                const div = document.createElement('div');
                div.className = 'meal-list';
                const h4 = document.createElement('h4');
                h4.className = "style-name";
                h4.innerText = mealItem.strMeal;
                div.appendChild(h4);
                div.onclick = `displayFoodDetail(${mealItem.strMeal})`;
                const img = document.createElement('img');
                img.src = `${mealItem.strMealThumb}`;
                div.appendChild(img);
                bodyContent.appendChild(div)
              

            };
        };
    
//     const displayDetail = (id)=>{
//         const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
//         fetch(url)
//         .then(res =>res.json())
//         .then(data => renderInfo(data.meals[0]));
//     }
// const renderInfo = meal => {
//     console.log(meals);
//     const mealDiv = document.getElementById('mealDetail');
//     mealDiv.innerHTML = `
//     <img src = "${meals.strMealThumb}"></img>
//         <h1>${meals.strMeal}</h1>
//         <p>Ingreadients:</p>
//         <p>${meals.strIngredient1}</p>
//         <p>${meals.strIngredient2}</p>
//         <p> ${meals.strIngredient3}</p>
//         <p>${meals.strIngredient4}</p>
//         <p>${meals.strIngredient5}</p>
//         <p> ${meals.strIngredient6}</p>
//         <p> ${meals.strIngredient7}</p>
//         <p> ${meals.strIngredient8}</p>
//         <p> ${meals.strIngredient9}</p>
//         <p> ${meals.strIngredient10}</p>
//     `
// }
