const Request = require('./services/request.js');

const countryRequest = new Request('https://restcountries.eu/rest/v2/all');

const appStart = function(){
  countryRequest.get(getAllCountriesComplete);








}

const getAllCountriesComplete = function(allCountries){
  allCountries.forEach(function(country){
    allCountriesView.addCountry(country);
  });
}


window.addEventListener('load', appStart);
