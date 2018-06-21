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
