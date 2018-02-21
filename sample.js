const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
var connection = mysql.createConnection({
    //properties...
    host:'localhost',
    user:'root',
    password:'',
    database: 'expresSqldb'
});

connection.connect(function(error){
    if(!!error) {
        console.log('Error');
    }else {
        console.log('connected');
    }
});

app.get('/', function(req, resp) {
    connection.query("SELECT * FROM expresssqlfirst", function(error,rows,fields){
        if(!!error) {
            console.log('Error in the query');
        }else {
            console.log("successful");
            console.log(rows[0].name);
            resp.send('hello' + rows[0].name)
        }
    })
})
//==================insert data to db==============================
app.get('/', function(req, resp) {
    var post = {id:'', name:"jai"};
    connection.query("INSERT INTO expresssqlfirst SET ?", post,  function(error,rows,fields){
        if(!!error) {
            console.log('Error in the query');
        }else {
            console.log("successful");

        }
    })
})
//==================create table to db==============================
    connection.query('CREATE TABLE people1(id int primary key, name varchar(255), age int, address text)', function(err, result) {
    if (err) throw err
    connection.query('INSERT INTO people1 (name, age, address) VALUES (?, ?, ?)', ['Larry', '41', 'California, USA'], function(err, result) {
      if (err) throw err
      connection.query('SELECT * FROM people1', function(err, results) {
        if (err) throw err
        console.log(results[0].id)
        console.log(results[0].name)
        console.log(results[0].age)
        console.log(results[0].address)
      })
    })
  })

//==================create table to db==============================
app.listen(3000), function() {
    console.log('server started on port 3000...');
}
//==================insert data to db==============================


//================first Express code============================
// // init app
// // const app = express();
// // view engin
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// // Home Route
// app.get('/', function(req, res){
//     res.render('index');
// });
//
// app.get('/home', function(req, res){
//     res.render('home');
// });
//
//
//
// // start server
// app.listen(3000, function() {
//     console.log("server started on port 3000...");
// })











//=======================================================
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// const Server = require('socket.io');
// var io = new Server();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());


var connection = mysql.createConnection({
    //properties...
    host:'localhost',
    user:'root',
    password:'',
    database: 'expresSqldb'
});

connection.connect(function(error){
    if(!!error) {
        console.log('Error');
    }else {
        console.log('connected');
    }
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/home', function(req, res) {
    res.render('home');
});
app.get('/login', function(req,res) {
    res.render('login');
});
app.get('/', function(req, resp) {
    connection.query("SELECT * FROM expresssqlfirst", function(error,rows,fields){
        if(!!error) {
            // console.log('Error in the query');
        }else {
            // console.log("successful");
             console.log(rows[0].name);
            resp.send('hello' + rows[0]);
        }
    })
})
// //==================insert data to db==============================
app.get('/', function(req, resp) {
    var post = {id:'', name:"viji"};
    connection.query("INSERT INTO expresssqlfirst SET ?", post,  function(error,rows,fields){
        if(!!error) {
            console.log('Error in the query');
        }else {
            console.log("successful");

        }
    })
})
//==================form data to db==============================
app.get('/', function(req, resp){
    connection.query('CREATE TABLE WORKER(name VARCHAR(255))',
     function(error,rows,fields){
         if(!!error) {
             console.log('error to create table');
         } else {
             console.log('successfuly created');
         }
     });
});
//==================form data to db==============================
app.get('/home', function(req,resp){
connection.query('CREATE TABLE people(id int primary key, name varchar(255), age int, address text)', function(err, result) {
    if (err) throw err
    connection.query('INSERT INTO people (name, age, address) VALUES (?, ?, ?)', ['Larry', '41', 'California, USA'], function(err, result) {
      if (err) throw err
      connection.query('SELECT * FROM people', function(err, results) {
        if (err) throw err
        console.log(results[0].id)
        console.log(results[0].name)
        console.log(results[0].age)
        console.log(results[0].address)
      })
    })
  })
});
connection.end();
// app.get('/',(req, res) =>{
//     let sql = 'CREATE TABLE posts(name varchar(255))';
//     connection.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('posts table created....')
//     });
// });




// app.post('/',urlencodedParser, function(req, resp) {
//     console.log(req.body.name);
//
//      connection.query('INSERT INTO emplist(name,age,city) values(?,?,?)',[req.body.name,req.body.age,req.body.city],
//      function(error,rows,fields) {
//          if(!!error) {
//              console.log('Error in the query');
//          }else {
//              console.log("successful");
//
//          }
//      });

    // connection.query("INSERT INTO emplist SET ?", post,  function(error,rows,fields){
        // if(!!error) {
        //     console.log('Error in the query');
        // }else {
        //     console.log("successful");
        //
        // }
    // })
//})
// app.post('/login', function(req, res) {
//     console.log(req.body.name,req.body.age,req.body.city);
//     var post =  {  var id = '';
//         var empname = req.body.name;
//         var empage = req.body.age;
//         var empcity = req.body.city;
//     }
//     connection.query('INSERT INTO emplist SET ?', post, function(error, rows, fields) {
//         if(!!error){
//             console.log('query error');
//         }else {
//             console.log('successfuly saved');
//         }
//
//     })
//
//     console.log(empname,empage,empcity);
//     res.send('posted empprofile :'+name+"age:"+age+"city:"+city);
//     console.log(empname,empage,empcity);
//
//     // var empData = req.body;
//     // var newEmployee = new Employee({
//     //     name:empData.name,
//     //     age:empData.age,
//     //     city:empData.city
//     // });
//     // newEmployee.save(function(err, Employee) {
//     //     if(err) {
//     //         console.log('error');
//     //     } else {
//     //         console.log('success', Employee);
//     //     }
//     // });
// });


app.listen(3000), function() {
    console.log('server started on port 3000...');
}
//================first Express code============================
// // init app
// // const app = express();
// // view engin
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// // Home Route
// app.get('/', function(req, res){
//     res.render('index');
// });
//
// app.get('/home', function(req, res){
//     res.render('home');
// });
//
//
//
// // start server
// app.listen(3000, function() {
//     console.log("server started on port 3000...");
// })
