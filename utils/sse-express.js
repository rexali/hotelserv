var sseExpress = require('sse-express');
//...
app.get('/updates', sseExpress, function(req, res) {
    res.sse('connected', {
      welcomeMsg: 'Hello world!'
    });
});