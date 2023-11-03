const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const crypto=require("crypto");
// express app
const app = express();
var bodyParser = require('body-parser')
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
  return row
    ? res.render("index",{user:req.body.username,school:row.school,level:row.email,dept:row.dept})
    : res.render("login",{error:"Invalid username or password"});

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
  res.render('index', { title: 'Home', blogs });
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
app.get('/cat/:id', (req, res) => {
  let params=(req.params.id);
 let curuser= params.substring(1);
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM cat WHERE user=? "
   db.all(sql, [curuser], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.render("cat", { model: rows });
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
app.get('/users/:id', (req, res) => {
  let params=(req.params.id);
  let curuser= params.substring(1);
  let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
   });
   const sql = "SELECT * FROM users where school=? "
   db.all(sql, [curuser], (err, rows) => {
     if (err) {
       return console.error(err.message);
     }
     res.render("users", { model: rows });
   });
 
});
app.get('/result', (req, res) => {
  res.render('result', { title: 'About' });
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
    let sql = `insert into cat(id,semester,course_code,level,user,dept,cat,exam,school,reg_no)values(?,?,?,?,?,?,?,?,?,?)`;
   let semester = req.body.semester;
   let level = req.body.level;
   let course_code = req.body.course_code;
   let exam= req.body.exam;
   let cat = req.body.cat;
   let dept= req.body.dept;
   let user = req.body.user;
   let school = req.body.school;
   let reg_no = req.body.reg_no;
   // first row only
   db.run(sql, [crypto.randomUUID(),semester,course_code,level,user,dept,cat,exam,school,reg_no], (err, row) => {
     if (err) {
       return console.error(err.message);
     }else{
      res.render('cat');
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
