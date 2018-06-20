const BucketList = function(){
  this.bucketlist = [];
}

BucketList.prototype.add = function (selectedCountry) {
  this.bucketlist.push(selectedCountry);
};




model.exports = BucketList;
