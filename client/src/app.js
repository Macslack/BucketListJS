const Request = require('./services/request.js');
const BucketList = require('./models/bucketList.js')
const AllCountriesView = require('./views/allCountriesView.js')
const Country = require('./models/country.js')

const countryRequest = new Request('https://restcountries.eu/rest/v2/all');
const bucketListRequest = new Request("http://localhost:3000/api/countries");
const allCountriesView = new AllCountriesView();
const bucketList = new BucketList();

const appStart = function(){

  countryRequest.get(getAllCountriesComplete);

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
  bucketCountriesView.addCountry(country);
}

const handleAddCountry = function() {
  const newCountryName = document.querySelector("option").value;
  const countryToAdd = new Country(newCountryName)
  bucketList.add(countryToAdd)
  bucketListRequest.post(countryToAdd, createRequestComplete);
  console.log(bucketList);
}










window.addEventListener('load', appStart);
