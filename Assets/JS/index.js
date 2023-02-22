var documentHTML = document;
var pname = documentHTML.getElementById("pname");
var prodCategory = documentHTML.getElementById("pcategory");
var prodPrice = documentHTML.getElementById("price");
var desc = documentHTML.getElementById("desc");
var addBtn = documentHTML.getElementById("addBtn");
var updateBtn = documentHTML.getElementById("updateBtn");
var searchprod=documentHTML.getElementById('searchInput');


var prodName=documentHTML.getElementById('prodName-alert');
var prodCat=documentHTML.getElementById('prodCat-alert');
var prodPrecio =documentHTML.getElementById('prodPrice-alert');
var prodDesc =documentHTML.getElementById('prodDesc-alert');

var gIndex=0;

var productContainer = [];

getLocalStorage();

// if(localStorage.getItem('allProduct')==null){
//   var productContainer = [];
// }
// else{
//   productContainer=JSON.parse(localStorage.getItem('allProduct'))
//   console.log(productContainer);
//   display()
// }

function create() {

  // if (elem === "Update Product"){
  //     elem = "Add Product";  
  //     document.getElementById("toggleButton").innerHTML=elem;
  //    } 

  var product = {
    prodname: pname.value,
    prodCate: prodCategory.value,
    price: prodPrice.value,
    prodesc: desc.value,
  };

  productContainer.push(product);
  addLocalStorage();
  //localStorage.setItem('allProduct',JSON.stringify(productContainer))
  display();
  reset();

  // Fire This Function when a New Entry Added
  Toastify({
  text: "A New Product Added Successfully",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "right", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
  // console.log(productContainer);
}

function display() {
  var trs = ``;
  for (var i = 0; i < productContainer.length; i++) {
    trs += `
     <tr class="">
              <td >${i + 1}</td>
              <td>${productContainer[i].prodname}</td>
              <td>${productContainer[i].prodCate}</td>
              <td>${productContainer[i].price}</td>
              <td>${productContainer[i].prodesc}</td>
              <td><button class="btn btn-outline-warning" onclick="UpdateItem(${i})"><i class="fa-solid fa-edit"></i></button></td>
              <td><button class="btn btn-outline-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
    
     `;
  }

  document.getElementById("tableBody").innerHTML = trs;
}

function deleteItem(index) {
  productContainer.splice(index, 1);
  deleteLocalStorage();
  // if(productContainer.length<1){
  //   localStorage.clear();
  // }
  // else{
  //   localStorage.setItem('allProduct',JSON.stringify(productContainer));
  // }
  
  display();
}

function myUpdate(){
  // console.log('index is', index);
  var newData=
  {
    prodname:pname.value,
    prodCate:prodCategory.value,
    price:prodPrice.value,
    prodesc:desc.value,
  }
  // console.log("eh el a5bar",newData)
  //Add The new item and delete the old one @ the same place
  productContainer.splice(gIndex, 1, newData );

  //call display
  display();
  reset();

   // Fire This Function when an Update Occured Successfully
   Toastify({
    text: "The Product Updated Successfully",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #f9ee05, #93ff43)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
    // console.log(productContainer);
  

  addBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');

  addLocalStorage();

  //return the old function to the button

  // if (elem === "Update Product"){
  //   elem = "Add Product";  
  //   document.getElementById("toggleButton").innerHTML=elem;
  //   document.getElementById("toggleButton").onclick=function() { create( ); };
  //  } 
}

function UpdateItem(index) {
  // console.log('index is', index);
  // if (elem === "Add Product"){
  //   elem = "Update Product";
  //   document.getElementById("toggleButton").innerHTML=elem;
  //   document.getElementById("toggleButton").onclick = function() { myUpdate( index ); }
    // document.getElementById("toggleButton").innerHTML=elem;
  //}

    //  change();
    // var newData=productContainer[index];

    pname.value=productContainer[index].prodname;
    prodCategory.value=productContainer[index].prodCate;
    prodPrice.value=productContainer[index].price;
    desc.value=productContainer[index].prodesc;

    updateBtn.classList.remove('d-none');
    addBtn.classList.add('d-none');

    gIndex=index;

    //  var newData=
    // {
    //   prodname:pname.value,
    //   prodCate:prodCategory.value,
    //   price:prodPrice.value,
    //   prodesc:desc.value,
    // }
    // productContainer.splice(index, 0, newData);
    // // // delete old one
    // productContainer.splice(index++, 1);

    // document.getElementById("toggleButton").onclick=create;
    
 
    // newData.prodname= pname.value;
    // newData.prodCate= prodCategory.value;
    // newData.price= prodPrice.value;
    // newData.prodesc= desc.value;
 

  // console.log(index,newData);

  //Add new on the same place
  // productContainer.splice(index, 0, newData);
  // // // delete old one
  // productContainer.splice(index++, 1);

  // display();
}

/*function change() // no ';' here
{
    
    if (elem === "Add Product"){
      elem = "Update Product";
      document.getElementById("toggleButton").innerHTML=elem;
      document.getElementById("toggleButton").onclick=UpdateItem;
      // document.getElementById("toggleButton").innerHTML=elem;
    } 
    // else {
    //   elem = "Add Product";
    // }
   
}*/


function reset() {
  pname.value = "";
  prodCategory.value = "";
  prodPrice.value = "";
  desc.value = "";
}



function searchProduct(){
// console.log(searchprod.value)
var trs=``;
for(var i=0;i<productContainer.length;i++){
    if(productContainer[i].prodname.toLowerCase().includes(searchprod.value.toLowerCase()))
      {
      var replaceValue=new RegExp(searchprod.value, 'i');
      //console.log("The value is " + replaceValue)
      // console.log('hello123'.replace(/\d+/g, /\*+/g));
        trs +=`
        <tr>
        <td >${i+1}</td>
        <td>${productContainer[i].prodname.replace(replaceValue,(match)=>`<mark>${match}</mark>`)}</td>
        <td>${productContainer[i].prodCate}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].prodesc}</td>
        <td><button class="btn btn-outline-warning" onclick="UpdateItem(${i})"><i class="fa-solid fa-edit"></i></button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i></button></td>  
        </tr> 
        `
    }
}
document.getElementById('tableBody').innerHTML=trs
}

/**************************************Local Storage******************************************* */

function deleteLocalStorage(){
if(productContainer.length<1){
    localStorage.clear();
  }
  else{
    localStorage.setItem('allProduct',JSON.stringify(productContainer));
  }
}


function addLocalStorage(){
localStorage.setItem('allProduct',JSON.stringify(productContainer))
}


function getLocalStorage(){
if(localStorage.getItem('allProduct')==null){
  productContainer = [];
}
else{
  productContainer=JSON.parse(localStorage.getItem('allProduct'))
  console.log(productContainer);
  display();
}
}


/********************************KeyBord Events*********************************************** */

//check on the element is hidden or not on the DOM
const isHidden = elem => {
  const styles = window.getComputedStyle(elem)
  return styles.display === 'none' || styles.visibility === 'hidden'
}

function keyBoardClick(e){
  if (e.keyCode === 13) {

    if (isHidden(updateBtn)) {
      // console.log(`Element is hidden!!`);
      validationInput()? create(): '';
    } else {
      validationInput()? myUpdate(): '';
      // console.log(`Element is visible!!`)
      ;
    }
  }
}


/*************************************Validation************************************************ */

//name Validation
function nameValidation() {
  //var regex= /^[A-Z][a-z]{3,9}$/;
  if (/^[A-Z]/.test(pname.value)) {
    if (/[a-z]{1,9}$/.test(pname.value)) {
      prodName.classList.add("d-none");
      pname.classList.remove("is-invalid");
      pname.classList.add("is-valid");
      //SignUpBtn.classList.remove('disabled')
      return true;
    } else {
      prodName.innerHTML = "Should Contain From 1 to 9 Small Letters ";
      pname.classList.remove("is-valid");
      pname.classList.add("is-invalid");
      prodName.classList.remove("d-none");
      return false;
    }
  } else {
    prodName.innerHTML = "Should Start With A Capital Letter";
    prodName.classList.remove("d-none");
    pname.classList.remove("is-valid");
    pname.classList.add("is-invalid");
    return false;
  }
}

//category Validation
function catValidation() {
  //var regex= /^[A-Z][a-z]{3,15}$/;
  if (/^[A-Z]/.test(prodCategory.value)) {
    if (/[a-z]{3,15}$/.test(prodCategory.value)) {
      prodCat.classList.add("d-none");
      prodCategory.classList.remove("is-invalid");
      prodCategory.classList.add("is-valid");
      //SignUpBtn.classList.remove('disabled')
      return true;
    } else {
      prodCat.innerHTML = "Should Contain From 3 to 15 Small Letters ";
      prodCategory.classList.remove("is-valid");
      prodCategory.classList.add("is-invalid");
      prodCat.classList.remove("d-none");
      return false;
    }
  } else {
    prodCat.innerHTML = "should Start with A Capital Letter";
    prodCat.classList.remove("d-none");
    prodCategory.classList.remove("is-valid");
    prodCategory.classList.add("is-invalid");
    return false;
  }
}

//price Validation
function priceValidation() {
  var regex= /^[0-9]+$/;
  if (regex.test(prodPrice.value)) {
    prodPrecio.classList.add("d-none");
    prodPrice.classList.remove("is-invalid");
    prodPrice.classList.add("is-valid");
    //SignUpBtn.classList.remove('disabled')
    return true;
  } else {
    prodPrecio.innerHTML = "Should Only Contain Numbers";
    prodPrecio.classList.remove("d-none");
    prodPrice.classList.remove("is-valid");
    prodPrice.classList.add("is-invalid");
    return false;
  }
}

//Description Validation
function descValidation() {
  var regex= /\S+/;
  if (regex.test(desc.value)) {
    prodDesc.classList.add("d-none");
    desc.classList.remove("is-invalid");
    desc.classList.add("is-valid");
    //SignUpBtn.classList.remove('disabled')
    return true;
  } else {
    prodDesc.innerHTML = "Field Should Not Be Empty ";
    prodDesc.classList.remove("d-none");
    desc.classList.remove("is-valid");
    desc.classList.add("is-invalid");
    return false;
  }
}



//total Validation check
function validationInput() {
  if (
    nameValidation() &&
    catValidation() &&
    priceValidation() &&
    descValidation()
  ) {
    // alertValid.classList.replace('d-block','d-none')
    if(isHidden(updateBtn)){
    addBtn.classList.remove("disabled");
    return true;
    }
    else{
      updateBtn.classList.remove("disabled");
    return true;
    }
   
  } else {
    addBtn.classList.add("disabled");
    updateBtn.classList.add("disabled");
    // alertValid.classList.replace('d-none','d-block')
    return false;
  }
}


/**************************************Event Listeners******************************************* */
window.addEventListener("DOMContentLoaded", function () {
  getLocalStorage();
});

addBtn.addEventListener('click', function(){
  create();
});

updateBtn.addEventListener('click', function(){
  myUpdate();
});

//fire the keyBoardAdd function when a specific key is Pressed Down
documentHTML.addEventListener("keydown", keyBoardClick);


//input Fields validation
pname.addEventListener("blur", function () {
  nameValidation();
});

prodCategory.addEventListener("blur", function () {
  catValidation();
});

prodPrice.addEventListener("blur", function () {
  priceValidation();
});

desc.addEventListener("blur", function () {
  descValidation();
});

//check Validation when body Updats
documentHTML.body.addEventListener("input", function () {
  validationInput();
});


