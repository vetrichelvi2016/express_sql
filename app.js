const express = require('express');
const path = require('path');
const mysql = require('mysql');
const http = require('http');
const bodyParser = require('body-parser');
const flash = require('express-flash-messages');
const expressSession = require('express-session');

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
// app.use(app.router);
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
// app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/login', function(req, res) {
    // res.sendFile("./form.html");
    res.sendFile(path.join(__dirname + '/login.html'));
})
app.get('/addemployee', function(req, res) {
    // res.render('addemployee');
    res.sendFile(path.join(__dirname + '/addemployee.html'));
});
app.get('/viewemployee', function(req, res){
    res.sendFile(path.join(__dirname + '/viewemployee.html'));
})
//===============================================
app.get('/employeelist', function(req, res) {

    connection.query("SELECT * FROM addemployee", function(error,results,fields) {
        if(!!error) {
            console.log('Error in the query');
        }else {
            console.log("successful");
         var empList = results;
         for (i in empList) {
             var empName = empList[i].name;
             var empDob = empList[i].dob;
             var empDes = empList[i].designation;
             var empSalary = empList[i].salary;
         }
         // console.log('empList', empList.id);
         res.render('employeelist', {
             empList:results
         })
           // res.end(JSON.stringify(empList[i]));
         // console.log('emplist',empName,empDob,empDes,empSalary);
        }
    })
})
//===============================================
app.get('/viewemployee', function(req, res) {
    connection.query("SELECT * FROM addemployee", function(error,results,fields) {
        if(!!error) {
            console.log('Error in the query');
        }else {
            console.log("successful");

             var empList = results;
             for (i in empList) {
                 let empName = empList[i].name;
                 let empDob = empList[i].dob;
                 let empDes = empList[i].designation;
                 let empSalary = empList[i].salary;
             }
               // res.end(JSON.stringify(empList[i]));
             // console.log('emplist',empName,empDob,empDes,empSalary);
                // res.end(JSON.stringify(results));
             //
             //
              // res.render('viewemployee',{
              //     // "nameslist" : empList[i].name,
              //     // "doblist"  : empList[i].dob,
              //     // "designationlist" : empList[i].designation,
              //     // "salarylist" :  empList[i].salary
              //     AllEmpList :empList
              // });
              // console.log('nameslist',nameslist);
                 res.end(JSON.stringify(empList[i]));
             //   res.send('empList' + results[0].name + results[0].namedob );
             // console.log(fields);
            // resp.send('hello' + rows[0].name)
        }
    })
})
//=====================Edit Employee==========================
app.get('addemployee/:id', function(req, res) {
    console.log(req);
    connection.query('SELECT FROM addemployee WHERE id=?', [req.params.id],
    function(error, results, fields) {
        if(!!error) {
            console.log('[mysql error]error in the query');
        }else {
            console.log('edit emplpyee');
        }
    })
})

//=====================Edit Employee==========================
app.post('/addemployee', function(req, res) {
    var emp_profile = {
        name : req.body.emp_name,
        dob  : req.body.emp_dob,
        designation  :req.body.emp_des,
        salary : req.body.emp_salary
    }
    connection.query('INSERT INTO addemployee SET ?', emp_profile,
    function(error, rows, fields){
        if(!!error) {
            console.log('[mysql error]error in the query');
        }else {
            console.log('successfuly added emplpyee');
        }
        // req.flash('notify', 'successfuly added employee');
        res.redirect('/addemployee')
        // res.send('successfuly added employee');
        console.log('emp-name', emp_name,emp_dob,emp_des,emp_salary);
    })
})
//=======================================================
app.post('/login', function(req, res) {
    var post = {
        username:req.body.username,
        password:req.body.password
    }
    connection.query("INSERT INTO login SET ?", post,  function(error,rows,fields){
            if(!!error) {
                console.log('Error in the query');
            }else {
                console.log("successful");
            }
        })
        res.send('/login');
        console.log('username', username);
        console.log('password',password);
         // res.status(401).send('not found, please register');
})

app.listen(3000), function() {
    console.log('server started on port 3000...');
}
