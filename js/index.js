//============GLobal===================
const bars=document.getElementById('bars');
const item=document.getElementById('navItem')
const close=document.getElementById('close')
const searchByName =document.getElementById('mealName')
const serchByFristLetter=document.getElementById('SearchByFristLetter')


//===========event============

$('#bars').click(function(){
    item.classList.replace('d-none','d-block')
    bars.classList.replace('d-block','d-none')
     close.classList.replace('d-none','d-block')
})
close.addEventListener('click',function(){
    item.classList.replace('d-block','d-none')
    bars.classList.replace('d-none','d-block')
    close.classList.replace('d-block','d-none')
})
 $(document).ready(()=>{
    $('#loading').slideUp(2000);
    searchName('');
})
$('#search').click(function(){
    search()
})
$('#categories').click(function(){
  getCategories()
})
$('#area').click(function(){
   getArea()
})
$('#ingredients').click(function(){
    getIngrerdients()
})
$('#contact').click(function(){
    contact()
})
// mealName.addEventListener('keyup', function(e){
//     //alert('os')
// let searchMeal=e.target.value;
// console.log(searchMeal)
//   searchByName(searchMeal)
// })
// serchByFristLetter.addEventListener('keyup',async function(e){
//     let searchMeal=e.target.value;
// console.log(searchMeal)
//  await searchByFristLetter(searchMeal)
// })
//=======search================
function search(){
    let search=`<div class="col-md-6">
    <div>
        <input onkeyup="searchName(this.value)" type="text" placeholder="Search By Name" name="search" id="mealName" class="form-control">
    </div>
</div>
<div class="col-md-6">
    <div>
        <input onkeyup='searchByFristLetter(this.value)' type="text" placeholder="Search By Frist Letter"  name="search" id="SearchByFristLetter" class="form-control">
    </div>
</div>`
document.getElementById('data').innerHTML=search;
}

//==================api================
async function searchName(meal){
    const search=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  let response=await search.json()
    displayMeal(response.meals)
}
async function searchByFristLetter(meal){
    const search=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  let response=await search.json()
    displayMeal(response.meals)
}

function displayMeal(arr){
    let meal=''
    for( let i=0;i<arr.length;i++){
        meal +=`<div class="col-md-3">
        <div  onclick="getMealDetails('${arr[i].idMeal}')" class=" image rounded  position-relative overflow-hidden">
         <img src="${arr[i].strMealThumb}" alt="" class="img-fluid  " >
         <div class="layer "> </div>
            <div class="meal">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>

     </div>`
    }
    document.getElementById('data').innerHTML =meal;
}



async function getMealDetails(mealID) {     
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
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



    let mealDetail  = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2 >Instructions</h2>
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

    document.getElementById('data').innerHTML=mealDetail
}
async function getCategories() {
    let category = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await category.json()
    displayCategory(response.categories)
  //  displayCategory(response.categories)
    

}
function displayCategory(arr){
    let category='';
    for( let i=0;i < arr.length; i++){
       category +=`<div class="col-md-3">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class=" image rounded  position-relative overflow-hidden">
         <img src="${arr[i].strMealThumb}" alt="" class="img-fluid  " >
         <div class="layer "> </div>
            <div class="meal">
                <h3>${arr[i].strMeal}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>

     </div>`
    }
    document.getElementById('data').innerHTML = category
}

//==============fetch category data=============
async function getCategoryMeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=${category}`)
    response = await response.json()


    displayMeal(response.meals.slice(0, 20))
   

}
async function getArea() {
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
}
function displayArea(arr) {
    let meal = "";

    for (let i = 0; i < arr.length; i++) {
        meal+= `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                        <h3 class='text-white'>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

   document.getElementById('data').innerHTML=meal
}
async function getAreaMeals(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeal(response.meals.slice(0, 20))
}

//===========fetch ingredients data===========
async function getIngrerdients(){
    let ingredient =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let response =await ingredient.json();
    displayIngredient(response.meals.slice(0,20))
}

function displayIngredient(arr) {
   let ingredient = "";

   for (let i = 0; i < arr.length; i++) {
       ingredient += `
       <div class="col-md-3">
               <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                       <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                       <h3 class="text-white">${arr[i].strIngredient}</h3>
                       <p class="text-white">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
               </div>
       </div>
       `
   }

   document.getElementById('data').innerHTML = ingredient
}
async function getIngredientsMeals(ingredients) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
   response = await response.json()


   displayMeal(response.meals.slice(0, 20))
   

}
//========contact==========
function contact(){
    let contact =`<form class="row g-3 my-4" id="contact">
    <div class="col-md-6">
       <div class="form-data">
          <input type="text" id="yourtName" class="form-control" placeholder="Enter Your Name" />

          <p class="alert alert-danger p-0 d-none" id="nameAlert">             
        Special characters and numbers not allowed
          </p>
       </div>
    </div>
    

    <div class="col-md-6">
       <div class="form-data">
          <input type="email" id="email" class="form-control" placeholder="Email Address" />
          <p id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
            Email not valid *exemple@yyy.zzz
        </p>
       </div>
    </div>
    <div class="col-md-6">
        <div class="form-data">
           <input type="tel" id="phone" class="form-control" placeholder="Enter Your Phone" />
           <p id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid Phone Number
        </p>
        </div>
     </div>
  
    <div class="col-md-6">
       <div class="form-data">
          <input type="number" id="age" class="form-control" placeholder="Enter Your Age" />
          <p id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid age
        </p>
       </div>
    </div>
    <div class="col-md-6">
        <div class="form-data">
           <input type="password" id="password" class="form-control" placeholder="EnterY Your password"/>
           
           <p id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
        </p>
        </div>
     </div>
     <div class="col-md-6">
        <div class="form-data">
           <input type="password" id="repassword" class="form-control" placeholder="EnterY Your password" />
           <p id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid repassword 
        </p>
        </div>
     </div>
    
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3 w-25 d-flex justify-content-center">Submit</button>
      
    
 </form>`
 document.getElementById('data').innerHTML=contact
}
function validationName() {
    const regexStyle =
       /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
 
    if (regexStyle.test(inputs[0].value)) {
      
       inputs[0].classList.add("is-valid");
       
       return true;
    } else{
       inputs[0].classList.add("is-invalid");
       alertName.classList.replace('d-none','d-block')
 
       return false;
    } 
 }
 function validationEmail() {
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regexStyle.test(inputs[1].value)) {
       inputs[1].classList.add("is-valid");
       return true;
    } else {
       inputs[1].classList.add("is-invalid");
       alertEmail.classList.replace('d-none','d-block')
 
       return false;
    }
 }
 function validationPhone() {
   const regexStyle = /^((01)[1 2 5][0-9]{8})$/;

   if (regexStyle.test(inputs[2].value)) {
      
      inputs[2].classList.add("is-valid");
      
      return true;
   } else {
      inputs[2].classList.add("is-invalid");
      alertPhone.classList.replace('d-none','d-block')
      return false;
   }
}
 function validationAge() {
    const regexStyle = /^([1-9][0-9])$/;
    if (regexStyle.test(inputs[3].value)) {
       inputs[3].classList.add("is-valid");
       return true;
    } else {
       inputs[3].classList.add("is-invalid");
       alertAge.classList.replace('d-none','d-block')
       
 
       return false;
    }
 }
 function validationPassword() {
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 
    if (regexStyle.test(inputs[4].value)) {
   
       inputs[4].classList.add("is-valid");
   
       return true;
    } else {
      
 
       inputs[4].classList.add("is-invalid");
      alertPassword.classList.replace('d-none','d-block')
 
       return false;
    }
 }
function validationRePassword(){
   
   if( inputs[5].value==inputs[4].value ){
       inputs[5].classList.add("is-valid");
      return true;
   }else{
      inputs[5].classList.add("is-invalid");
      alertRePassword.classList.replace('d-none','d-block')
      return false;
   }
}
