const express = require('express');
const path = require('path'); //con este modulo se unifican las rutas para identificarlas mejor
const app = express();

app.use(express.static('public')); //se tiene la carpeta public como recurso estático para poder consumirlo
app.use(express.urlencoded({extended:false}));

app.listen(3000, ()=>{
    console.log('Servidor activo en el puerto 3000');
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './views/index.html'));
})


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'));
})

app.get('/catalog', (req, res) => {
    res.sendFile(path.join(__dirname, './views/catalog.html'));
})

app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, './views/about-us.html'));
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, './views/contact.html'));
})

app.get('/product-detail', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productDetail.html'));
})

app.get('/product-cart', (req, res) => {
    res.sendFile(path.join(__dirname, './views/productCart.html'));
})

app.post('/datos', (req,res)=>{
    res.send(req.body);

});

