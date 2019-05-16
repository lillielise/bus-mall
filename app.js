'use strict';

// Global variables
var products = document.getElementById('products');
var clearData = document.getElementById('clear-data');
var productOne = document.getElementById('product-one');
var productTwo = document.getElementById('product-two');
var productThree = document.getElementById('product-three');

var productArray = [];
var randomNumberArray = [];
var counter = 20;

// Arrays to hold data for the chart
var votesChart;
var votes = [];
var names = [];

var chartDrawn = false;


//check if ls is empty


if (localStorage.getItem('products')){

  var retrievedProducts = localStorage.getItem('products');
  // console.log('this is the retrieved products', retrievedProducts);

  var parsedProducts = JSON.parse(retrievedProducts);
  // console.log('this is the parsed products', parsedProducts);
  
  productArray = parsedProducts;

  


} else {
  createInstances();
}




// Constructor
function Product(name) {
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.timesShown = 0;
  this.timesClicked = 0;
  productArray.push(this);
}

// Instances
function createInstances(){
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
}

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




// function to showARandomProduct
function showARandomProduct (){

  // assign src, title, and alt product one
  productOne.src = productArray[randomNumberArray[counter][0]].filepath;
  productOne.alt = productArray[randomNumberArray[counter][0]].name;
  productOne.title = productArray[randomNumberArray[counter][0]].name;
  productArray[randomNumberArray[counter][0]].timesShown ++;

  // assign src, title, and alt product two

  productTwo.src = productArray[randomNumberArray[counter][1]].filepath;
  productTwo.alt = productArray[randomNumberArray[counter][1]].name;
  productTwo.title = productArray[randomNumberArray[counter][1]].name;
  productArray[randomNumberArray[counter][1]].timesShown ++;

  // assign src, title, and alt product three
  productThree.src = productArray[randomNumberArray[counter][2]].filepath;
  productThree.alt = productArray[randomNumberArray[counter][2]].name;
  productThree.title = productArray[randomNumberArray[counter][2]].name;
  productArray[randomNumberArray[counter][2]].timesShown ++;


}


// function that adds up the times clicked
function tallyTimesClicked(){
  for (var j = 0; j < productArray.length; j++){
    if (event.target.alt === productArray[j].name) {
      // console.log(`${productArray[j].name} was clicked`);
      productArray[j].timesClicked ++;
      votes[j] =+ productArray[j].timesClicked;
    }

  }
}

// function that pushes the names and votes to the respective arrays

function populateNames (){
  for (var j = 0; j < productArray.length; j++){
    names[j]= productArray[j].name;
    votes[j] = 0;
  }
}

// Chart Stuff
var backgroundColors = [];


function makeColors(){
  for (var i = 0; i < productArray.length; i++){
    var endOfColor = (i * .05).toFixed(2);
    var color = `rgba(255, 0, 0, ${endOfColor})`;
    backgroundColors.unshift(color);
  }
}


var data = {
  labels: names, // names array declared earlier
  datasets: [{
    data: votes, // votes array declared earlier
    label: 'Total Votes',
    backgroundColor: backgroundColors,
    hoverBackgroundColor: '#FFD0C7',
    borderColor: 'black',
    borderWidth: 2
  }]
};

function drawChart() {
  var ctx = document.getElementById('product-chart').getContext('2d');
  votesChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      legend: {
        labels: {
          backgroundColor: 'black',
        }
      },
      responsive: false,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  chartDrawn = true;
}

// Event handler
function handleProductClick(){
  tallyTimesClicked();
  counter ++;
  if (counter < 25){
    showARandomProduct();
  } else {
    products.innerHTML = '';
    makeColors();
    drawChart();

    var stringifiedProducts = JSON.stringify(productArray);
    localStorage.setItem('products', stringifiedProducts);
    // console.log('stringified products', stringifiedProducts);
  }
}


// Event handler for clearing data
function handleClearData(){
  event.preventDefault();
  localStorage.clear();
  createInstances();
  console.log('you clicked the button!');

}


// Event listener
products.addEventListener('click', handleProductClick);
// Event listener for clearing data
// clearData.addEventListener('submit', handleClearData);

// Show the images
generateRandomNumbers();
showARandomProduct();
populateNames();
