//GLOBAL VARIABLES!
//total number of clicks - after 25 offer choice to see stats
var totalClicks = 20;
//initialize product array - will be an array of objects via ProductSelection constructor
var productArray = [];
var productTitles = [];
//probably variables I should keep track of ¯\_(ツ)_/¯
var imageForDom, trackImages, dataResults, ctx, testingResultsBarChart;
//user wants to do 10 additional clicks after 25
var userMoreTesting = false;

//OBJECT CONSTRUCTORS
//url should return the img link for display on page, displayCount is number of times this shows on the page, clickCount is the number of times this image was clicked on, Display Name is the friendly name for SWEET CHARTS, identity will be attached to each image for an id= field for clickCount
function ProductSelection(imageLink, displayName){
  this.imageLink = imageLink;
  this.displayCount = 0;
  this.clickCount = 0;
  this.displayName = displayName;
  this.identity = imageLink.slice(4,-4);
}

//FUNCTION PARTY TOWNHOUSE, BYOB BUT SNACKS PROVIDED
//for loop determines how many images are shown at once, i < 3 means 3 images at once
function selectNewImages() {
  var randNum = getRandomArray();
  for (i = 0; i < 3; i++) {
    //pick image from the productArray
    //create element for DOM, attach to DOM, iterate displayCount++
    var imageForDom = document.getElementById('selector-section');
    var img = document.createElement('img');
    img.className += ' product-choices';
    img.id = productArray[randNum[i]].identity;
    img.src = productArray[randNum[i]].imageLink;
    productArray[randNum[i]].displayCount++;
    imageForDom.appendChild(img);
  }
};
//sum each index of two arrays, return a combined array - remember to pass localstorage as array2
function sumArrayValues(array1, array2) {
  var summedArray = [];
  for (var i = 0; i < array1.length; i++){
    summedArray.push(array1[i] + array2[i]);
  }
  return summedArray;
}

//shuffle array function - for randomizing. from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//randomizer function - selects 3, change splice for more up to array.length
function getRandomArray() {
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  var shuffledArray = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
  //splice to only return 3 values
  var randomThreeArray = shuffledArray.splice(0, 3);
  //return array of 3 random no-duplicate numbers
  console.log('random3array: ', randomThreeArray);
  return randomThreeArray;
};

//clear the section for a new set of 3
function clearImages() {
  var sectionContainer = document.getElementById('selector-section');
  while(sectionContainer.firstChild){
    sectionContainer.removeChild(sectionContainer.firstChild);
  }
};

function displayCharts() {
  console.log('LOOKS LIKE IT IS CHART TIME - you just called displayCharts()');
  document.getElementById('instructions-h2').style.display = 'none';
  toggleVisibility('results-h2');
  //SPECIAL CHART SUB-ZONE #4: I HATE UNDERWATER LEVELS IN MARIO GAMES
  var productLabelsArray = [];
  for (i = 0; i < productArray.length; i++) {
    productLabelsArray.push(productArray[i].displayName);
  }
  var productClicksArray = [];
  for (i = 0; i < productArray.length; i++) {
    productClicksArray.push(productArray[i].clickCount);
  }
  var productDisplayArray = [];
  for (i = 0; i < productArray.length; i++) {
    productDisplayArray.push(productArray[i].displayCount);
  }
  //check if localstorage exists, if so add session+local, else just use session - for DISPLAY
  var localDisplay, combinedDisplay, tempDisp, tempDisplayStorage;
  if (localStorage.getItem('locDisp')) {
    tempDisplayStorage = localStorage.getItem('locDisp');
    localDisplay = JSON.parse(tempDisplayStorage);
    combinedDisplay = sumArrayValues(productDisplayArray, localDisplay);
    tempDisp = JSON.stringify(combinedDisplay);
    localStorage.setItem('locDisp', tempDisp);
  } else {
    var tempDisp = JSON.stringify(productDisplayArray);
    localStorage.setItem('locDisp', tempDisp);
    combinedDisplay = productDisplayArray;
  }
  //check if localstorage exists, if so add session+local, else just use session - for CLICKS
  var localClicks, combinedClicks, tempClicks, tempClicksStorage;
  if (localStorage.getItem('locClicks')) {
    tempClicksStorage = localStorage.getItem('locClicks');
    localClicks = JSON.parse(tempClicksStorage);
    combinedClicks = sumArrayValues(productClicksArray, localClicks);
    tempClicks = JSON.stringify(combinedClicks);
    localStorage.setItem('locClicks', tempClicks);
  } else {
    var tempClicks = JSON.stringify(productClicksArray);
    localStorage.setItem('locClicks', tempClicks);
    combinedClicks = productClicksArray;
  }
  var conversionRateArray = [];
  for (i = 0; i < productArray.length; i++) {
    var percentClicked = combinedClicks[i] / combinedDisplay[i];
    if(isNaN(percentClicked)) {
      conversionRateArray.push(0);
    } else {
      conversionRateArray.push(percentClicked * 100);
    }
  }
  var dataResults = {
    labels: productLabelsArray,
    datasets: [
      {
        label: 'Times Displayed',
        fillColor: 'rgba(70,137,102,0.5)',
        strokeColor: 'rgba(70,137,102,0.8)',
        highlightFill: 'rgba(70,137,102,0.75)',
        highlightStroke: 'rgba(70,137,102,1)',
        data: combinedDisplay
      },
      {
        label: 'Times Clicked',
        fillColor: 'rgba(255,176,59,0.5)',
        strokeColor: 'rgba(255,176,59,0.8)',
        highlightFill: 'rgba(255,176,59,0.75)',
        highlightStroke: 'rgba(255,176,59,1)',
        data: combinedClicks
      },
      {
        label: 'Conversion Rate \%',
        fillColor: 'rgba(142,40,0,0.5)',
        strokeColor: 'rgba(142,40,0,0.8)',
        highlightFill: 'rgba(142,40,0,0.75)',
        highlightStroke: 'rgba(142,40,0,1)',
        data: conversionRateArray
      }
    ]
  };
  var ctx = document.getElementById('myChart').getContext('2d');
  var testingResultsBarChart = new Chart(ctx).Bar(dataResults);
};

function askUserToContinue() {
  console.log('Want to answer 10 more questions? Well? Do you? askUserToContinue() wants to know');
  toggleVisibility('button-section');
}

function toggleVisibility(elementId) {
  var checkVisibility = document.getElementById(elementId);
  if(checkVisibility.style.display == 'block') {
    checkVisibility.style.display = 'none';
  } else {
    checkVisibility.style.display = 'block';
  }
};

//controls total clicks from  user - main logic loop
function continueLoop() {
  if (totalClicks < 25) {
    clearImages();
    selectNewImages();
    var trackImages = document.getElementsByClassName('product-choices');
    for (var i = 0; i < trackImages.length; i++){
      trackImages[i].addEventListener('click', handleImageClick);
    }
  } else if (totalClicks === 25 ) {
    //prompt user to continue or go direct to scoring
    clearImages();
    askUserToContinue();
  } else if (totalClicks > 25 && totalClicks < 35) {
    //continue providing images until 35
    clearImages();
    selectNewImages();
    var trackImages = document.getElementsByClassName('product-choices');
    for (var i = 0; i < trackImages.length; i++){
      trackImages[i].addEventListener('click', handleImageClick);
    }
  } else if (totalClicks === 35 || totalClicks > 35) {
    clearImages();
    displayCharts();
  } else {
    //continues loop after user choice until it hits another condition for some reason
    clearImages();
    selectNewImages();
    var trackImages = document.getElementsByClassName('product-choices');
    for (var i = 0; i < trackImages.length; i++){
      trackImages[i].addEventListener('click', handleImageClick);
    }
  }
};

//create objects - one per product, then push into productArray;
productArray.push(new ProductSelection('img/bag.jpg','R2D2 Luggage'));
productArray.push(new ProductSelection('img/banana.jpg', 'Banana Slicer'));
productArray.push(new ProductSelection('img/bathroom.jpg','iPad TP Stand'));
productArray.push(new ProductSelection('img/boots.jpg','Yellow Rainboots'));
productArray.push(new ProductSelection('img/breakfast.jpg','AIO Breakfast Machine'));
productArray.push(new ProductSelection('img/bubblegum.jpg','Meatball Gumballs'));
productArray.push(new ProductSelection('img/chair.jpg','Red Chair'));
productArray.push(new ProductSelection('img/cthulhu.jpg','Cthulhu Figurine'));
productArray.push(new ProductSelection('img/dog-duck.jpg','Canine Duckmask'));
productArray.push(new ProductSelection('img/dragon.png','Dragonmeat'));
productArray.push(new ProductSelection('img/pen.jpg','Utinsil Pen'));
productArray.push(new ProductSelection('img/pet-sweep.jpg','Pet Broom Slippers'));
productArray.push(new ProductSelection('img/scissors.jpg','Pizza Scissors'));
productArray.push(new ProductSelection('img/shark.jpg','Shark Sleeping Bag'));
productArray.push(new ProductSelection('img/sweep.png','Baby Sweeper Onesie'));
productArray.push(new ProductSelection('img/tauntaun.jpg','Tauntaun Sleeping Bag'));
productArray.push(new ProductSelection('img/unicorn.jpg','Unicorn Meat'));
productArray.push(new ProductSelection('img/usb.gif','USB Powered Tentacle'));
productArray.push(new ProductSelection('img/water-can.jpg','Boring Watering Can'));
productArray.push(new ProductSelection('img/wine-glass.jpg','Goofy Wineglass'));

//this function starts the party
selectNewImages();

//event handler - totalClicks++ counts total number of image iterations so the option for charts can be given at 25 and 35 (potentially 45, 55, etc...?)
function handleImageClick(event){
  totalClicks++;
  console.log('current totalClicks: ', totalClicks);
  var currentImageIdentity = event.target.id;
  console.log('event.target.id ', currentImageIdentity);
  for (i = 0; i < productArray.length; i++) {
    if (currentImageIdentity === productArray[i].identity) {
      productArray[i].clickCount++;
    }
  }
  continueLoop();
};

function userChoice(event){
  if (event.target.id === 'confirm') {
    toggleVisibility('button-section');
    selectNewImages();
    var trackImages = document.getElementsByClassName('product-choices');
    for (var i = 0; i < trackImages.length; i++){
      trackImages[i].addEventListener('click', handleImageClick);
    }
  } else {
    console.log('userChoice() - user wants to go to charts');
    toggleVisibility('button-section');
    displayCharts();
  }
};

//event listeners - listens for user clicks
var trackImages = document.getElementsByClassName('product-choices');
for (var i = 0; i < trackImages.length; i++){
  trackImages[i].addEventListener('click', handleImageClick);
}
var userChoiceSelection = document.getElementsByClassName('button');
for (var i = 0; i < userChoiceSelection.length; i++){
  userChoiceSelection[i].addEventListener('click', userChoice);
}
