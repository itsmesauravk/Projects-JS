// Today's date : Jan 20, 2024 20:44:30

const express = require('express');
const app = express();
const port = 3000;



app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);


