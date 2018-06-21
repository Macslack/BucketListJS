/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Request = __webpack_require__(1);
const BucketList = __webpack_require__(3)
const AllCountriesView = __webpack_require__(2)
const BucketCountriesView = __webpack_require__(5)
const Country = __webpack_require__(4)
const MapWrapper = __webpack_require__(6)

const countryRequest = new Request('https://restcountries.eu/rest/v2/all');
const bucketListRequest = new Request("http://localhost:3000/api/countries");
const allCountriesView = new AllCountriesView();
const bucketCountriesView = new BucketCountriesView();
const bucketList = new BucketList();

const appStart = function(){

  countryRequest.get(getAllCountriesComplete);
  drawMap();
}

const drawMap = function(){
  const mapDiv = document.getElementById('main-map')
  console.log(mapDiv);
  const zoomLevel = 15;
    const glasgow = [55.86515, -4.25763];
  const mainMap = new MapWrapper(mapDiv, glasgow, zoomLevel);
  };


const getAllCountriesComplete = function(allCountries){
  allCountries.forEach(function(country){
    allCountriesView.addCountry(country);

  });

  const addCountryButton = document.querySelector("#add-country-button")
  allCountriesView.makebuttonVisible(addCountryButton);
  addCountryButton.addEventListener("click", handleAddCountry);
}

const createRequestComplete = function(country){
  console.log(country);
  bucketCountriesView.showSelectedCountry(country);
}

const handleAddCountry = function() {
  const option = document.querySelector("#countries-list")
  const newCountryName = option.value;
  console.log(newCountryName);
  const countryToAdd = new Country(newCountryName)
  bucketList.add(countryToAdd)
  bucketListRequest.post(countryToAdd, createRequestComplete);
  console.log(bucketList);
}










window.addEventListener('load', appStart);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function (next) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function(){
    if(this.status !== 200) return;
    const responseBody = JSON.parse(this.response);
    next(responseBody);
  })
  request.send()
};

Request.prototype.post = function (result, next) {
    const request =  new XMLHttpRequest();
    request.open("POST", this.url);
    request.setRequestHeader("Content-type", "application/json")

    request.addEventListener("load", function(){
      if(this.status !== 201) return;
      const responseBody = JSON.parse(this.response);
      next(responseBody);
    })
    request.send(JSON.stringify(result))
};

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var allCountriesView = function(){

}

allCountriesView.prototype.addCountry = function (country) {
    const select = document.querySelector("#countries-list");
    const option = document.createElement("option");
    option.textContent = country.name;
    option.value = country.name;
    select.appendChild(option);
};

allCountriesView.prototype.makebuttonVisible = function (button) {
  button.hidden = false;

};

module.exports = allCountriesView


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const BucketList = function(){
  this.bucketlist = [];
}

BucketList.prototype.add = function (selectedCountry) {
  this.bucketlist.push(selectedCountry);
  
};




module.exports = BucketList;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Country = function(name){
  this.name = name;
}

module.exports = Country;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var BucketCountriesView = function(){

}

BucketCountriesView.prototype.showSelectedCountry = function (SelectedCountry) {
    const bucketList = document.querySelector("#selected-countries");
    const li = document.createElement("li");
    li.textContent = SelectedCountry.name
    bucketList.appendChild(li);
};

BucketCountriesView.prototype.makebuttonVisible = function (button) {
  button.hidden = false;

};

module.exports = BucketCountriesView


/***/ }),
/* 6 */
/***/ (function(module, exports) {

const MapWrapper = function(element, coords, zoom){
  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
  this.map = L.map(element).addLayer(osmLayer).setView(coords, zoom);
  this.map.on('click', function(event){
    this.addMarker(event.latlng);

  }.bind(this))

}


MapWrapper.prototype.addMarker = function(coords){
  L.marker(coords).addTo(this.map);

};


module.exports = MapWrapper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map