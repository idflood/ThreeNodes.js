var phantom = require('phantom');

// Colored console output
var sty = require('sty');

var display_errors = function(errors) {
  for (var i = 0; i < errors.length; i++) {
    var error = errors[i];
    console.log("  # " + error.module + " | " + error.test);
    for (var j = 0; j < error.items.length; j++) {
      var err2 = error.items[j];
      console.log("  → " + err2.message);
      if (err2.expected) {
        console.log("    " + err2.expected);
        console.log("    " + sty.red(err2.actual));
      }
    }
    console.log("");
  }
};

return phantom.create(function(ph) {
  return ph.createPage(function(page) {
    page.set("onConsoleMessage", function(msg) {
      return console.log(msg);
    });
    return page.open("http://localhost:3000/test", function(status) {
      if (status !== "success") {
        console.log("Unable to access network: " + status);
        return ph.exit(1);
      } else {
        var interval = false;
        var checkTests = function() {
          return page.evaluate((function(){
            return document.qunitResult;
          }), function(result){
            if (!result) {
              // waiting results
            }
            else {
              var prefix = "✖ ";
              if (result.failed == 0) prefix = "✓ ";
              // force color output event if these console.log are redirected
              sty.enable();
              console.log("##########################");
              console.log("");
              if (result.failed > 0) {
                console.log(sty.red(prefix + "Tests Failed!"));
              }
              else {
                console.log(sty.green(prefix + "Tests completed!"));
              }
              
              console.log("  Passed: " + result.passed);
              console.log("  Total:  " + result.total);
              
              if (result.failed > 0) {
                console.log(sty.bold("  Failed: " + result.failed));
                console.log("");
                display_errors(result.errors);
              }
              console.log("");
              
              clearInterval(interval);
              ph.exit();
            }
          });
        };
        
        interval = setInterval(checkTests, 250);
      }
    });
  });
});
