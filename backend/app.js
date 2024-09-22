const express = require('express');
const app = express();
const PORT = process.env.PORT | 5000;
const authRoute = require('./routes/authRoute');
const contactRoute = require('./routes/contactRoute')
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODBURI)
.then(() => console.log(`Database connected: ${mongoose.connection.host}`))
.catch((error) => console.log(error.message));

//END OF IMPORTS  
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use("/auth", authRoute);
app.use('/contacts', contactRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})