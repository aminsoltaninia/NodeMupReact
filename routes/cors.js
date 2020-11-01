const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000' , 'https://localhost:3433'];

var corsOptionsDelegate = (req, callback) =>{
    var corsOptions;
    if(whitelist.indexOf(req.header('origin')) !== -1){// cheking req  for exist origin in whitelist
      corsOptions = { origin : true }
    }
    else { 
        corsOptions = { origin : false }
    }
    callback(null , corsOptions)
}

exports.cors = cors();// access control whit thw while 

exports.corsWithOptions = cors(corsOptionsDelegate); // for access by specific options for specific routes