const express = require('express');
const app = express();
const port = 3000;

app.configure(function(){
  app.set("view options", {layout: false});

  // make a custom html template
  app.register('.html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
  });
});

app.get('/a', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.render("index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
