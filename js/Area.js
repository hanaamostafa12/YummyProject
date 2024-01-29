async function  getArea(){
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let response= await data.json();
    return response.meals;
  }
  
  
  getArea()
  
    //  display of meals
  
  function displayCategories(array){
  
    let  cartona = ``
  
    for(let i = 0; i < array.length; i++ ){
    
        cartona += `
        <div class="col-md-3">
        <div onclick="getAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${array[i].strArea}</h3>
        </div>
</div>
        
        
        `
    }
    
    document.getElementById("rowData3").innerHTML=cartona;
  
   }



   function displayMeals(arry) {
    let cartoona = "";

    for (let i = 0; i < arry.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arry[i].idMeal}')" class="item-meal   overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arry[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer  d-flex align-items-center text-black p-2">
                        <h3>${arry[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData3.innerHTML = cartoona
}



   async function getCategoryMeals(category) {


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))


}
async function getAreaMeals(area) {


  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()


  displayMeals(response.meals.slice(0, 20))


}


async function getIngredientsMeals(ingredients) {

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()


  displayMeals(response.meals.slice(0, 20))


}

function displayMealDetails(meal) {
  let ingredients = ``

  for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
          ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }
  }
  let tags = meal.strTags?.split(",")
  // let tags = meal.strTags.split(",")
  if (!tags) tags = []

  let tagsStr = ''
  for (let i = 0; i < tags.length; i++) {
      tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
  }
  let cartoona = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>

              <h3>Tags :</h3>
              <ul class=" d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`

  rowData3.innerHTML = cartoona
}

async function getMealDetails(mealID) {

  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  respone = await respone.json();

  displayMealDetails(respone.meals[0])


}



   async function mainFunction(){
     try{
       let array = await getArea();
       displayCategories(array)}
       catch (error) {
          console.log('error', error);
     }
   }
   mainFunction()

     //  loadind function
 
$(function(){
  $(".loading").fadeOut(1000,function(){
    $('body').css('overflow', 'auto')
  })
})  


