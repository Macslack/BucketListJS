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
