const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const crypto=require("crypto");
// express app
const app = express();

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var bodyParser = require('body-parser')
var fs = require('fs');

var pdf = require('html-pdf');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
secret: "thisismysecrctekey",
saveUninitialized:true,
cookie: { maxAge: oneDay },
resave: false
}));
app.use(cookieParser());
// POST /login gets urlencoded bodies
app.post('/SetupData', urlencodedParser, function (req, res) {
   const sqlite3 = require('sqlite3').verbose();
  let datas = [crypto.randomUUID(), req.body.username, req.body.school, req.body.email, req.body.password];
// open database in memory
let db = new sqlite3.Database('./db/chinook.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// close the database connection

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(`INSERT INTO users(id,username,school,email,password) VALUES(?,?,?,?,?)`, datas, function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }).each(`SELECT * FROM users`, (err, row) => {
      if (err){
        throw err;
      }
      console.log(row.school);
      if(row.username===req.body.username){
            console.log("duplicate copy");
            res.render('create',{error:"username already exist"})
      }else{
    res.render('login')
      }
      
    });
    
});
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
});

app.post('/updateusers', urlencodedParser, function (req, res) {
  const sqlite3 = require('sqlite3').verbose();
 let datas = [req.body.username,req.body.level, req.body.password,req.body.dept, req.body.exams, req.body.result, req.body.users, req.body.id];
// open database in memory
let db = new sqlite3.Database('./db/chinook.db', (err) => {
 if (err) {
   return console.error(err.message);
 }
console.log('Connected to the in-memory SQlite database.');
});

// close the database connection

db.serialize(() => {
 // Queries scheduled here will be serialized.
 db.run(`UPDATE users SET username=?,level=?, password=?,dept=?,exams=?,result=?,users=? WHERE id=?`, datas, function(err) {
     if (err) {
       return console.log(err.message);
     }
     // get the last insert id
     res.send(`A row has been updated with rowid `);
   })
   
});
db.close((err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Close the database connection.');
});
});
app.post('/updatecat', urlencodedParser, function (req, res) {
  console.log("hygtyhhgg")
  const sqlite3 = require('sqlite3').verbose();
 let datas = [req.body.semester,req.body.course_code, req.body.cat, req.body.exam, req.body.reg_no, req.body.id];
// open database in memory
let db = new sqlite3.Database('./db/chinook.db', (err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Connected to the in-memory SQlite database.');
});

// close the database connection

db.serialize(() => {
 // Queries scheduled here will be serialized.
 db.run(`UPDATE cat SET semester=?,course_code=?, cat=?,exam=?,reg_no=? WHERE id=?`, datas, function(err) {
     if (err) {
       return console.log(err.message);
     }
     // get the last insert id
     res.send(`A row has been updated with rowid `);
   })
   
});
db.close((err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Close the database connection.');
});
});
app.post('/updatecourse', urlencodedParser, function (req, res) {
  const sqlite3 = require('sqlite3').verbose();
 let datas = [req.body.level,req.body.course_code, req.body.course_title, req.body.lecturer, req.body.unit, req.body.id];
// open database in memory
let db = new sqlite3.Database('./db/chinook.db', (err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Connected to the in-memory SQlite database.');
});

// close the database connection

db.serialize(() => {
 // Queries scheduled here will be serialized.
 db.run(`UPDATE courses SET level=?,course_code=?, course_title=?,lecturer=?,unit=? WHERE id=?`, datas, function(err) {
     if (err) {
       return console.log(err.message);
     }
     // get the last insert id
     res.send(`A row has been updated with rowid `);
   })
   
});
db.close((err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Close the database connection.');
});
});

app.post('/registerUser', urlencodedParser, function (req, res) {
  const sqlite3 = require('sqlite3').verbose();
 let datas = [crypto.randomUUID(), req.body.username,req.body.level,req.body.dept, req.body.password, req.body.result,req.body.exams, req.body.users, req.body.school];
// open database in memory
let db = new sqlite3.Database('./db/chinook.db', (err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Connected to the in-memory SQlite database.');
});

// close the database connection

db.serialize(() => {
 // Queries scheduled here will be serialized.
 db.run(`insert into users(id,username,level,dept,password,result,exams,users,school)values(?,?,?,?,?,?,?,?,?)`, datas, function(err) {
  if (err) {
    return console.error(err.message);
  }
res.send("user inserted")
console.log("user inserted")
});
   
});
db.close((err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Close the database connection.');
});
});

app.post('/logdata', urlencodedParser, function (req, res) {

 // open database in memory
let db = new sqlite3.Database('./db/chinook.db', (err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Connected to the in-memory SQlite database.');
});

// close the database connection

db.serialize(() => {
 // Queries scheduled here will be serialized.
 let sql = `SELECT *   FROM users
           WHERE username  = ? and password=?`;
let username = req.body.username;
let password = req.body.password;
// first row only
db.get(sql, [username,password], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  if( row){
  req.session.user = req.body.username ;

  res.render("cat",{user:req.session.user,school:row.school,level:row.email,dept:row.dept})
}
    else{
      res.render("login",{error:"Invalid username or passwordz"});
    }
    

});
   
});
db.close((err) => {
 if (err) {
   return console.error(err.message);
 }
 console.log('Close the database connection.');
});
});
app.post('/namehint', urlencodedParser, function (req, res) {

  // open database in memory
 let db = new sqlite3.Database('./db/chinook.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
 });
 
 // close the database connection
 
 db.serialize(() => {
  // Queries scheduled here will be serialized.
  let sql = `SELECT *   FROM students
            WHERE stud_name  LIKE '%${req.body.stud_name}%'`;
 
 // first row only
 db.get(sql, [], (err, row) => {
   if (err) {
     return console.error(err.message);
   }
   if( row){
  res.send(row.stud_name)
 }
     else{
       res.send("no record");
     }
     
 
 });
    
 });
 db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
 });
 });
// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
 
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('login', { user:req.session.username,title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.get('/projects', (req, res) => {
  res.render('projects', { title: 'About' });
});
app.get('/exams', (req, res) => {
  res.render('exams', { title: 'About' });
});
app.get('/cat', (req, res) => {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM cat WHERE user=? "
   db.all(sql, [req.session.user], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.render("cat", {user:req.session.user,model: rows });
   });
 
});
app.post('/getcat',urlencodedParser, function (req, res) {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM cat WHERE user=? and level=? "
   db.all(sql, [req.session.user,req.body.grade], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.send(rows);
   });
 
});
app.get('/getclass', (req, res) => {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM class"
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.send(rows);
   });
 
});
app.get('/course', (req, res) => {
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM courses "
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.render("course", { model: rows });
   });
 
});
app.get('/student', (req, res) => {
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM students "
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.render("students", { model: rows });
   });
 
});
app.get('/users', (req, res) => {
  
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM users  "
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.render("users", {user:req.session.user, model: rows });
   });
 
});
app.post('/getreport',urlencodedParser, function (req, res){
  const pos=1;

  const user=req.body.search;
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * from cat where reg_no=?"
   db.all(sql, [user], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     if(rows.length>0){
     let html =`<center><br><br><br><br><br><br><h1>Report Card</h1><img src="images/logo.jpg/>"<br><br><table style="font-size:20pt; text-align:center;"><tr><td>Student Name:${user} </td><td>      </td><td>Class: ${rows[1].level}</td></tr>
     <tr><td>Position:_______________ </td><td>      </td><td>Out of:____________</td></tr> </table><table style="font-size:15pt" border=1><tr style="background-color:black;color:white;"><th>SUBJECT</th>
     </th><th>Continous Assesment</th><th>Examination</th></th></th><th>TOTAL</th></th><th>AVERAGE</th></th><th>
     GRADE</th></tr>`
     let e=0;
     let c=0;
    let t=0;
    let n=0;
    rows.forEach(element => {
      // './test/businesscard.html'
      t=t+parseInt(element.cat)+parseInt(element.exam);
      e=e+parseInt(element.exam);
      c=c+parseInt(element.cat)
      n=n+1;
html=html+ `<tr><td>${element.course_code}</td><td>${element.cat}</td><td>${element.exam}</td><td>${parseInt(element.cat)+parseInt(element.exam)}</td>
<td>${parseInt(element.cat)+parseInt(element.exam)}</td><td>${element.grade}</td>></tr>`
    
     
    })
    html=html+`<tr><td><b>Total </td> <td>${c}</td><td>${e}</td><td>${t}</td><td>${t}</td><br> </tr>
   </table></center> <h3><br> Average:${t/n}`
    var options = { format: 'letter',landscape:true };
    pdf.create(html, options).toStream(function (err, stream) {
      if (err) {
          console.log(err);
          res.status(500).send("Some kind of error...");
          return;
      }
      stream.pipe(res)
  })}else{
    res.send("<center><h1>No Record found for the student")
  }
   });
 
  

});
app.get('/printpreview/:userid', (req, res) => {
  const pos=1;

  const user=req.params.userid
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * from cat where reg_no=?"
   db.all(sql, [user.substring(1)], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     let html =`<center><br><br><br><br><br><br><h1>Report Card</h1><img src="images/logo.jpg/>"<br><br><table style="font-size:20pt; text-align:center;"><tr><td>Student Name:${user.substring(1)} </td><td>      </td><td>Class: ${rows[1].level}</td></tr>
     <tr><td>Position:_______________ </td><td>      </td><td>Out of:____________</td></tr> </table><table style="font-size:15pt" border=1><tr style="background-color:black;color:white;"><th>SUBJECT</th>
     </th><th>Continous Assesment</th><th>Examination</th></th></th><th>TOTAL</th></th><th>AVERAGE</th></th><th>
     GRADE</th></tr>`
     let e=0;
     let c=0;
    let t=0;
    let n=0;
    rows.forEach(element => {
      // './test/businesscard.html'
      t=t+parseInt(element.cat)+parseInt(element.exam);
      e=e+parseInt(element.exam);
      c=c+parseInt(element.cat)
      n=n+1;
html=html+ `<tr><td>${element.course_code}</td><td>${element.cat}</td><td>${element.exam}</td><td>${parseInt(element.cat)+parseInt(element.exam)}</td>
<td>${parseInt(element.cat)+parseInt(element.exam)}</td><td>${element.grade}</td>></tr>`
    
     
    })
    html=html+`<tr><td><b>Total </td> <td>${c}</td><td>${e}</td><td>${t}</td><td>${t}</td><br> </tr>
   </table></center> <h3><br> Average:${t/n}`
    var options = { format: 'letter',landscape:true };
    pdf.create(html, options).toStream(function (err, stream) {
      if (err) {
          console.log(err);
          res.status(500).send("Some kind of error...");
          return;
      }
      stream.pipe(res)
  })
   });
 
  

});
app.get('/scoresheet', (req, res) => {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * from courses order by course_title  "
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     //res.setHeader('Content-Type', 'application/pdf');
     res.send(rows)
  
   });
 
});
app.get('/class', (req, res) => {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * from class "
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.render("class", {model: rows });
  
   });
 
});
app.get('/scorenames', (req, res) => {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * from students"
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     //res.setHeader('Content-Type', 'application/pdf');
     res.send(rows)
  
   });
 
});
app.post('/name', urlencodedParser, function (req, res){
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * from cat where reg_no=? order by course_code"
   db.all(sql, [req.body.stud], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     //res.setHeader('Content-Type', 'application/pdf');
     res.send(rows)
     console.log(req.body.stud)
  
   });
 
});
app.get('/result', (req, res) => {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * from students"
   db.all(sql, [], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     //res.setHeader('Content-Type', 'application/pdf');
 
     res.render("result", {model: rows });
   });
 
});
app.post('/addcat', urlencodedParser, function (req, res) {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   
   // close the database connection
   
   db.serialize(() => {
    // Queries scheduled here will be serialized.
    let sql = `insert into cat(id,semester,course_code,level,dept,cat,user,exam,school,reg_no,grade)values(?,?,?,?,?,?,?,?,?,?,?)`;
   let semester = req.body.semester;
   let level = req.body.level;
   let course_code = req.body.course_code;
   let exam= req.body.exam;
   let cat = req.body.cat;
   let dept= req.body.dept;
   let grade="F"
   let total=parseInt(req.body.exam)+parseInt(req.body.cat)
   if(total>70){
     grade="A";
   }else if(total>60){
    grade="B";
   }else if(total>50){
     grade="C"
   }else if(total>40){
grade="D"
   }
   let school = req.body.school;
   let reg_no = req.body.reg_no;

   // first row only
   db.run(sql, [crypto.randomUUID(),semester,course_code,level,dept,cat,course_code,exam,school,reg_no,grade], (err, row) => {
     if (err) {
       return console.error(err.message);
     }else{
      res.send('cat');
     }
   console.log(reg_no);
   });
      
   });
   db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
   });
});
app.post('/deluser', urlencodedParser, function (req, res) {
  console.log("user deleted")
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   
   // close the database connection
   
   db.serialize(() => {
    // Queries scheduled here will be serialized.
    let sql = `delete from users WHERE id=?`;
   
   // first row only
   db.run(sql, [req.body.id], (err, row) => {
     if (err) {
       return console.error(err.message);
     }
   res.send("user deleted")
   
   });
      
   });
   db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
   });
});
app.post('/delcourse', urlencodedParser, function (req, res) {
  console.log("user deleted")
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   
   // close the database connection
   
   db.serialize(() => {
    // Queries scheduled here will be serialized.
    let sql = `delete from courses WHERE id=?`;
   
   // first row only
   db.run(sql, [req.body.id], (err, row) => {
     if (err) {
       return console.error(err.message);
     }
   res.send("user deleted")
   
   });
      
   });
   db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
   });
});
app.post('/delcat', urlencodedParser, function (req, res) {
  console.log("user deleted")
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   
   // close the database connection
   
   db.serialize(() => {
    // Queries scheduled here will be serialized.
    let sql = `delete from cat WHERE id=?`;
   
   // first row only
   db.run(sql, [req.body.id], (err, row) => {
     if (err) {
       return console.error(err.message);
     }
   res.send("user deleted")
   
   });
      
   });
   db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
   });
});
app.post('/delstud', urlencodedParser, function (req, res) {
  console.log("user deleted")
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   
   // close the database connection
   
   db.serialize(() => {
    // Queries scheduled here will be serialized.
    let sql = `delete from students WHERE id=?`;
   
   // first row only
   db.run(sql, [req.body.id], (err, row) => {
     if (err) {
       return console.error(err.message);
     }
   res.send("user deleted")
   
   });
      
   });
   db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
   });
});
   app.post('/addstudent', urlencodedParser, function (req, res) {
 
    let db = new sqlite3.Database('./db/chinook.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite databases');
     });
     
     // close the database connection
     
     db.serialize(() => {
      // Queries scheduled here will be serialized.
      let sql = `insert into students(id,stud_name,level,dept,school)values(?,?,?,?,?)`;
     let stud_name = req.body.stud_name;
    
     let level = req.body.level;
     let dept = req.body.dept;
     let school = req.body.school;
  
     // first row only
     db.run(sql, [crypto.randomUUID(),stud_name,level,dept,school], (err, row) => {
       if (err) {
         return console.error(err.message);
       }else{
        res.render('students');
       }
     
     });
        
     });
  
   db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
   });
});
app.post('/addcourse', urlencodedParser, function (req, res) {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   
   // close the database connection
   
   db.serialize(() => {
    // Queries scheduled here will be serialized.
    let sql = `insert into courses(id,level,course_code,course_title,lecturer,unit,school)values(?,?,?,?,?,?,?)`;
   let level= req.body.level;
   let course_title = req.body.course_title;
   let course_code = req.body.course_code;
   let lecturer = req.body.lecturer;
   let unit= req.body.unit;
   let school = req.body.school;

   // first row only
   db.run(sql, [crypto.randomUUID(),level,course_code, course_title,lecturer,unit,school], (err, row) => {
     if (err) {
       return console.error(err.message);
     }else{
      res.render('course');
     }
   
   });
      
   });
   db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
   });
});
app.post('/addstudent', urlencodedParser, function (req, res) {
 
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite databases');
   });
   
   // close the database connection
   
   db.serialize(() => {
    // Queries scheduled here will be serialized.
    let sql = `insert into students(id,stud_name,level,dept,school)values(?,?,?,?,?)`;
   let stud_name = req.body.stud_name;
  
   let level = req.body.level;
   let dept = req.body.dept;
   let school = req.body.school;

   // first row only
   db.run(sql, [crypto.randomUUID(),stud_name,level,dept,school], (err, row) => {
     if (err) {
       return console.error(err.message);
     }else{
      res.render('students');
     }
   
   });
      
   });

 db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
 });
});
app.post('/addclass', urlencodedParser, function (req, res) {

let db = new sqlite3.Database('./db/chinook.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
 });
 
 // close the database connection
 
 db.serialize(() => {
  // Queries scheduled here will be serialized.
  let sql = `insert into class(id,class,class_teacher)values(?,?,?)`;
 let level= req.body.level;
 let class_teacher = req.body.class_teacher;

 db.run(sql, [crypto.randomUUID(),level,class_teacher], (err, row) => {
   if (err) {
     return console.error(err.message);
   }else{
    res.send('welll');
   }
 
 });
    
 });
 db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
 });
});
app.get('/setup', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
  
});
app.get('/logout', (req, res) => {
  res.render('login', { title: 'Create a new blog' });
  
});
app.get('/login', (req, res) => {
  res.render('login', { title: 'Create a new blog' });
  
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
