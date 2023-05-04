const express=require('express');
const path=require('path');
const hbs=require("hbs");
const mongoose=require('mongoose');
const cookieparser=require("cookie-parser");
require("dotenv").config();

const app=express();

app.use(cookieparser())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static("public"));
app.use("/photo",express.static("photo"));

const pathpartial=path.join(__dirname,'views/partials');
hbs.registerPartials(pathpartial);

app.set("view engine","hbs");

const router=require("./server/router/page");
app.use("/",router);

app.listen(1982);


