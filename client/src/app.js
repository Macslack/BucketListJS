const Request = require('./services/request.js');
const BucketList = require('./models/bucketList.js')
const AllCountriesView = require('./views/allCountriesView.js')

const countryRequest = new Request('https://restcountries.eu/rest/v2/all');
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

const handleAddCountry = function() {
  const selectedCountry = document.querySelector("option");
  bucketList.add(selectedCountry)
  
}










window.addEventListener('load', appStart);
