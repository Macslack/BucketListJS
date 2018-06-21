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
