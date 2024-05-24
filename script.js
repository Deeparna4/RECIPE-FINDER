let buttonEl=document.getElementById("theme");
let fixed=document.querySelector(".receipe");

let count=0;
buttonEl.addEventListener("click",()=>{
if (count==0){
    document.body.style.cssText="background-color:lavender";
count++;}
else if(count==1){
    document.body.style.cssText="background-color:lightpink;";
    count++;
}
else if(count==2){
    document.body.style.cssText="background-color:aquamarine;";
    count++;
}
else if(count==3){
    document.body.style.cssText="background-color:lemonchiffon;";
    count++;
}
else if(count==4){
    document.body.style.cssText="background-color:lightskyblue;";
    count++;
}
else{
    document.body.style.cssText="background-color:lavenderblush;"; 
    count=0;
}
})
let dishEl=document.querySelector(".dish");
let enterEl= document.querySelector(".search input");
 enterEl.addEventListener("keyup",(event)=>{
  if(event.key=='Enter'){
    let inputValue=document.querySelector(".search input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
    .then(response=>response.json())
    .then(data=>{
        let foodItems='';
        if(data.meals){
            dishEl.innerHTML=" ";
           data.meals.forEach(meal=>{
            foodItems +=
           `<div style="border: 3px solid crimson; background-color: white">
          <img
            src="${meal.strMealThumb}"
            width="250px"
            height="250px"
            alt="${meal.strMeal}"
          />
          <p style="margin: 10px;max-width:230px;  color: crimson">
           ${meal.strMeal}
          </p>
          <a id="${meal.idMeal}" class="view" style="margin: 10px; text-decoration: none;margin-bottom:10px;" href="#"
            >view receipe<i class="fa-solid fa-utensils"></i
          ></a>
        </div>`;
    
           });
        }
        else{
            dishEl.innerHTML=`<h2 style="color:crimson">Sorry! we don't have receipe for ${inputValue}</h2>`;
        }
        dishEl.innerHTML+=foodItems;

  })}
 })

let searchEl=document.querySelector(".search button");
searchEl.addEventListener("click",()=>{
    let inputValue=document.querySelector(".search input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
    .then(response=>response.json())
    .then(data=>{
        let foodItems='';
        if(data.meals){
            dishEl.innerHTML=" ";
           data.meals.forEach(meal=>{
            foodItems +=
           `<div style="border: 3px solid crimson; background-color: white">
          <img
            src="${meal.strMealThumb}"
            width="250px"
            height="250px"
            alt="${meal.strMeal}"
          />
          <p style="margin: 10px;max-width:230px;  color: crimson">
           ${meal.strMeal}
          </p>
          <a id="${meal.idMeal}" class="view" style="margin: 10px; text-decoration: none;margin-bottom:10px;" href="#"
            >view receipe<i class="fa-solid fa-utensils"></i
          ></a>
        </div>`;
    
           });
        }
        else{
            dishEl.innerHTML=`<h2 style="color:crimson">Sorry! we don't have receipe for ${inputValue}</h2>`;
        }
        dishEl.innerHTML+=foodItems;

    })

})
dishEl.addEventListener("click",getRecipe);
function getRecipe(event){
event.preventDefault();
if(event.target.className=="view"){
   let idno=event.target.getAttribute("id");
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idno}`).then(response=>response.json()).then(data=>{
    let meal=data.meals[0];
    
   
    fixed.innerHTML=`<button type="button" onclick="closefun()" class="receipe-btn" id="btn-receipe"><i class="fa-solid fa-xmark"></i></button>
    <h2 class="food-name">${meal.strMeal}</h2>
    <p class="category-name">${meal.strCategory}</p>
    <div class="instruction">
      <h3>Instructions:</h3>
      <p>
        ${meal.strInstructions}
      </p>
    </div>
    <div class="food-image">
      <img src="${meal.strMealThumb}"   width="200px"
      height="200px" style="border-radius: 50%;"/>
    </div>
    <div class="video-link">
      <a href="${meal.strYoutube}">View and explore videos on this recipe!<i class="fa-solid fa-arrow-up-from-bracket"></i></a>
    </div>`
    fixed.style.cssText="display:block";
   })
}
}
function closefun(){
    fixed.style.cssText="display:none";
}
