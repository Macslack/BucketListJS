const Request = require('./services/request.js');
const BucketList = require('./models/bucketList.js')
const AllCountriesView = require('./views/allCountriesView.js')
const BucketCountriesView = require('./views/bucketCountriesView.js')
const Country = require('./models/country.js')

const countryRequest = new Request('https://restcountries.eu/rest/v2/all');
const bucketListRequest = new Request("http://localhost:3000/api/countries");
const allCountriesView = new AllCountriesView();
const bucketCountriesView = new BucketCountriesView();
const bucketList = new BucketList();

const appStart = function(){

  countryRequest.get(getAllCountriesComplete);
  bucketListRequest.get(getAllBucketListCountries);

}

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


const getAllBucketListCountries = function(bucketList) {
  console.log(bucketList);
  bucketList.forEach(function(country) {
    bucketCountriesView.showSelectedCountry(country);
  })
}










window.addEventListener('load', appStart);
