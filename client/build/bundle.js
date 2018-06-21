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
let mainMap;





const appStart = function(){

  countryRequest.get(getAllCountriesComplete);

  bucketListRequest.get(getAllBucketListCountries);
  // const mapDiv = document.getElementById('main-map')
  // const mainMap = new MapWrapper(mapDiv, [55.86515, -4.25763], 10);
  drawMap();

}

const drawMap = function(){
  const mapDiv = document.getElementById('main-map')
  const zoomLevel = 15;
  const glasgow = [55.86515, -4.25763];
  mainMap = new MapWrapper(mapDiv, glasgow, zoomLevel);
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
  bucketCountriesView.showSelectedCountry(country);
  const deleteCountryButton = document.querySelector("#delete-country-button")
  allCountriesView.makebuttonVisible(deleteCountryButton);
  deleteCountryButton.addEventListener("click", handleRemoveCountry)
}

const handleAddCountry = function() {
  const select = document.querySelector("#countries-list")
  const newCountryName = select[select.selectedIndex].textContent;
  const newCountryLatLng = select[select.selectedIndex].value.split(',') ;
  console.log(select[select.selectedIndex]);
  console.log(newCountryLatLng);
  const hash =
  {
    lat: newCountryLatLng[0],
    lng: newCountryLatLng[1]
  }
  const countryToAdd = new Country(newCountryName, hash)
  bucketList.add(countryToAdd)
  bucketListRequest.post(countryToAdd, createRequestComplete);
  console.log('in handleAddCountry', mainMap);
  mainMap.addMarker(hash);
}

const handleRemoveCountry = function() {
  const option = document.querySelector("#countries-list")
  const removeCountryName = option.value;
  // const countryToRemove = new Country(removeCountryName)
  bucketListRequest.delete(deleteRequestComplete)
  // bucketList.remove(removeCountryName)

}
const deleteRequestComplete = function() {
  bucketCountriesView.clear();
}


const getAllBucketListCountries = function(bucketList) {

  bucketList.forEach(function(country) {
    bucketCountriesView.showSelectedCountry(country);
  })

  if(bucketList.length > 0){
    const deleteCountryButton = document.querySelector("#delete-country-button")
    allCountriesView.makebuttonVisible(deleteCountryButton);
    deleteCountryButton.addEventListener("click", handleRemoveCountry)
  }
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

Request.prototype.delete = function(next) {
  const request = new XMLHttpRequest();
  request.open("DELETE", this.url);
  request.addEventListener("load", function() {
    if (this.status !== 204) return;
    next();
  });
  request.send();
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
    option.value = country.latlng;
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

BucketList.prototype.remove = function (selectedCountry) {
  this.bucketlist.forEach(function(country, index){
    if(country === selectedCountry){
      this.bucketList.splice(index, 1)
    }
  })
};



module.exports = BucketList;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Country = function(name, latlng){
  this.name = name;
  this.latlng = latlng;
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

BucketCountriesView.prototype.clear = function () {
  const bucketList = document.querySelector("#selected-countries");
  bucketList.innerHTML = ""
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
    console.log(event.latlng);

  }.bind(this))

}


MapWrapper.prototype.addMarker = function(coords){
  L.marker(coords).addTo(this.map);

};


module.exports = MapWrapper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map