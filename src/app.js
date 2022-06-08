const express = require('express');
const path = require('path'); //con este modulo se unifican las rutas para identificarlas mejor
const app = express();

app.use(express.static('./public')); //se tiene la carpeta public como recurso estático para poder consumirlo
app.use(express.urlencoded({extended:false}));

app.listen(3000, ()=>{
    console.log('Servidor activo en el puerto 3000');
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index.routes'));


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
})

app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, './views/about-us.html'));
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, './views/contact.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, './views/blog.html'));
})

app.post('/datos', (req,res)=>{
    res.send(req.body);

});

app.get('/admin', (req, res)=>{
    res.sendFile(path.join(__dirname, './views/adminArea.html'));
})
