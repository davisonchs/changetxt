const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Correct path usage
const distPath = path.join(__dirname, '../client/dist');
console.log('Serving static files from:', distPath);

app.use(express.static(distPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
