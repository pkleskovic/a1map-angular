const express = require('express');
const app = express();

app.use(express.static('./dist/a1-project-angular'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/a1-project-angular/' }
  );
});
app.listen(process.env.PORT || 8080);

/*
app.use(express.static('./dist/angular-heroku'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-heroku/'}),
);

app.listen(process.env.PORT || 8080);*/
