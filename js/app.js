//GLOBAL VARIABLES!
//total number of clicks - after 25 offer choice to see stats
var totalClicks = 0;
//initialize product array - will be an array of objects via ProductSelection constructor
var productArray = [];
//initialize all product variables
var bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, usb, watercan, wineglass;
//probably variables I should keep track of ¯\_(ツ)_/¯
var imageForDom, trackImages;
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
  for (i = 0; i < 3; i++) {
    //pick image from the productArray
    var randNum = getRandomIntInclusive(0, productArray.length - 1);
    //create element for DOM, attach to DOM, iterate displayCount++
    var imageForDom = document.getElementById('selector-section');
    var img = document.createElement('img');
    img.className += ' product-choices';
    img.id = productArray[randNum].identity;
    img.src = productArray[randNum].imageLink;
    productArray[randNum].displayCount++;
    imageForDom.appendChild(img);
  }
};
//randomizer function
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//clear the section for a new set of 3
function clearImages() {
  var sectionContainer = document.getElementById('selector-section');
  while(sectionContainer.firstChild){
    sectionContainer.removeChild(sectionContainer.firstChild);
  }
};

//controls total clicks from  user - mostly a placeholder for tomorrow
function continueLoop() {
  // if (totalClicks < 25 ) {
  clearImages();
  selectNewImages();
  var trackImages = document.getElementsByClassName('product-choices');
  for (var i = 0; i < trackImages.length; i++){
    trackImages[i].addEventListener('click', handleImageClick);
  //   }
  // } else if (totalClicks === 25 ) {
  //   console.log('you clicked 25 times');
  //   continue allowing user to guess 10 more times if they accept
  // } else if (totalClicks === 35)
  }
}

//create objects - one per product, then push into productArray;
bag = productArray.push(new ProductSelection('img/bag.jpg','R2D2 Luggage'));
banana = productArray.push(new ProductSelection('img/banana.jpg', 'Banana Slicer'));
bathroom = productArray.push(new ProductSelection('img/bathroom.jpg','iPad TP Stand'));
boots = productArray.push(new ProductSelection('img/boots.jpg','Yellow Rainboots'));
breakfast = productArray.push(new ProductSelection('img/breakfast.jpg','AIO Breakfast Machine'));
bubblegum = productArray.push(new ProductSelection('img/bubblegum.jpg','Meatball Gumballs'));
chair = productArray.push(new ProductSelection('img/chair.jpg','Red Chair'));
cthulhu = productArray.push(new ProductSelection('img/cthulhu.jpg','Cthulhu Figurine'));
dogduck = productArray.push(new ProductSelection('img/dog-duck.jpg','Canine Duckmask'));
dragon = productArray.push(new ProductSelection('img/dragon.jpg','Dragonmeat'));
pen = productArray.push(new ProductSelection('img/pen.jpg','Utinsil Pen'));
petsweep = productArray.push(new ProductSelection('img/pet-sweep.jpg','Pet Broom Slippers'));
scissors = productArray.push(new ProductSelection('img/scissors.jpg','Pizza Scissors'));
shark = productArray.push(new ProductSelection('img/shark.jpg','Shark Sleeping Bag'));
sweep = productArray.push(new ProductSelection('img/sweep.png','Baby Sweeper Onesie'));
tauntaun = productArray.push(new ProductSelection('img/tauntaun.jpg','Tauntaun Sleeping Bag'));
unicorn = productArray.push(new ProductSelection('img/unicorn.jpg','Unicorn Meat'));
usb = productArray.push(new ProductSelection('img/usb.gif','USB Powered Tentacle'));
watercan = productArray.push(new ProductSelection('img/water-can.jpg','Boring Watering Can'));
wineglass = productArray.push(new ProductSelection('img/wine-glass.jpg','Goofy Wineglass'));

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
}

//event listener - listens for user clicks on image elements
var trackImages = document.getElementsByClassName('product-choices');
for (var i = 0; i < trackImages.length; i++){
  trackImages[i].addEventListener('click', handleImageClick);
}
