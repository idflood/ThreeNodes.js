(function() {
  var run;

  run = function() {
    var phantom;
    phantom = require('phantom');
    return phantom.create(function(ph) {
      return ph.createPage(function(page) {
        page.set("onConsoleMessage", function(msg) {
          return console.log(msg);
        });
        return page.open("http://localhost:3000/test", function(status) {
          var checkTests, interval;
          console.log("opened test page3? ", status);
          if (status !== "success") {
            console.log("Unable to access network: " + status);
            return ph.exit(1);
          } else {
            interval = false;
            checkTests = function() {
              console.log("check...");
              return page.evaluate((function() {
                return document;
              }), function(total) {
                console.log("------------");
                return page.evaluate((function() {
                  return document.body.querySelectorAll('span.status > span')[0].innerHTML;
                }), function(total) {
                  console.log("------------ok");
                  console.log(total);
                  ph.exit(0);
                  return false;
                });
              });
            };
            return checkTests();
          }
        });
      });
    });
  };

  run();

  module.exports.run = run;

}).call(this);
