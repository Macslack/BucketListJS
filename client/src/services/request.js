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

module.exports = Request;
