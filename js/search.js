
    let  seacrh_input = document.getElementById("seacrh_input");
    let seacrh_input1 = document.getElementById("seacrh_input1");
    function displayData(productList){

      let  cartona = ``
    
      for(let i = 0; i < productList.length; i++ ){
      
          cartona += `
          <div class="col-md-3" >
          <div onclick="getMealDetails('${productList[i].idMeal}')" class="item-meal   overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${productList[i].strMealThumb}" alt="" srcset="">
              <div class="meal-layer  d-flex align-items-center   text-black p-2">
                  <h3>${productList[i].strMeal}</h3>
              </div>
          </div>
    </div>   `
      }  document.getElementById("rowData").innerHTML=cartona;
     }
     
 function displayMeals(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getMealDetails('${arr[i].idMeal}')" class="item-meal   overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer  d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  }

  rowData.innerHTML = cartoona
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
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>

            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`

rowData.innerHTML = cartoona
}

async function getMealDetails(mealID) {

let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
respone = await respone.json();

displayMealDetails(respone.meals[0])


}

     
     
     async function searchByName(term) {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      response = await response.json()
     response.meals ? displayData(response.meals) : displayData([]) 
  }
  seacrh_input.addEventListener("keyup",function(){
    searchByName(seacrh_input.value)
   })

   async function searchByFLetter(term) {

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayData(response.meals) : displayData([])

}

seacrh_input1.addEventListener("keyup",function(){
  searchByFLetter(seacrh_input1.value)
 })












   let isOpen = false;

$(".open").on("click", function(){
  let sideBarWidth = $(".sidebar").width();
  if(isOpen){
    $("#navbar").animate({left:-sideBarWidth},1000);
    $(this).removeClass("fa-solid fa-xmark").addClass(" fa-solid fa-2x fa-align-justify");
    }
     else{
      $(".sidebar").css("display","flex");
      $("#navbar").animate({left:-0},1000)
      $(this).removeClass("fa-solid fa-2x fa-align-justify").addClass("fa-solid fa-xmark");
     }
  
     isOpen =  !isOpen;
  
});

    
$("#search1").on("click", function(){
   $("#home").css("display","none")
});


