var allCountriesView = function(){

}

allCountriesView.prototype.addCountry = function (country) {
    const select = document.querySelector("#countries-list");
    const option = document.createElement("option");
    option.textContent = country.name
    select.appendChild(option);
};
