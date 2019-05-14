'use strict';

// Global variables
var products = document.getElementById('products');
var productOne = document.getElementById('product-one');
var productTwo = document.getElementById('product-two');
var productThree = document.getElementById('product-three');

var productArray = [];
var randomNumberArray = [];

// Constructor
function Product(name) {
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.timesShown = 0;
  this.timesClicked = 0;
  productArray.push(this);
}

// Instances
new Product('bag');
new Product('banana');
new Product ('bathroom');
new Product ('boots');
new Product ('breakfast');
new Product ('bubblegum');
new Product ('chair');
new Product ('cthulhu');
new Product ('dog-duck');
new Product ('dragon');
new Product ('pen');
new Product ('pet-sweep');
new Product ('scissors');
new Product ('shark');
new Product ('sweep');
new Product ('tauntaun');
new Product ('unicorn');
new Product ('usb');
new Product ('water-can');
new Product ('wine-glass');

// generate an array of arrays for the random number
function generateRandomNumbers(){
  for (var i = 0; i < 25; i++){
    var threeRandomNumbers = [];
    var lastThreeNumbers = [];
    if (i > 0){
      lastThreeNumbers = randomNumberArray[i-1];
    }
    while (threeRandomNumbers.length < 3){
      var randomNumber = Math.floor(Math.random() * productArray.length);

      if (threeRandomNumbers.indexOf(randomNumber) === -1 && lastThreeNumbers.indexOf(randomNumber) === -1 ){
        threeRandomNumbers.push(randomNumber);
      }
    }
    randomNumberArray.push(threeRandomNumbers);
  }
}


// set i to zero
var i = 0;

// function to showARandomProduct
function showARandomProduct (){

  // assign src, title, and alt product one
  productOne.src = productArray[randomNumberArray[i][0]].filepath;
  productOne.alt = productArray[randomNumberArray[i][0]].name;
  productOne.title = productArray[randomNumberArray[i][0]].name;
  productArray[randomNumberArray[i][0]].timesShown ++;

  // assign src, title, and alt product two

  productTwo.src = productArray[randomNumberArray[i][1]].filepath;
  productTwo.alt = productArray[randomNumberArray[i][1]].name;
  productTwo.title = productArray[randomNumberArray[i][1]].name;
  productArray[randomNumberArray[i][1]].timesShown ++;

  // assign src, title, and alt product three
  productThree.src = productArray[randomNumberArray[i][2]].filepath;
  productThree.alt = productArray[randomNumberArray[i][2]].name;
  productThree.title = productArray[randomNumberArray[i][2]].name;
  productArray[randomNumberArray[i][2]].timesShown ++;


}


// Event handler
function handleProductClick(event){
  for (var j = 0; j < productArray.length; j++){
    if (event.target.alt === productArray[j].name) {
      console.log(`${productArray[j].name} was clicked`);
      productArray[j].timesClicked ++;
    }
  }
  i ++;
  if (i < 25){
    showARandomProduct();
  } else {
    products.innerHTML = '';
  }
}




// Event listener
products.addEventListener('click', handleProductClick);

// Show the images
generateRandomNumbers();
showARandomProduct();
