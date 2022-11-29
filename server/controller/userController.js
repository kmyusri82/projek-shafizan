const mysql = require('mysql');



//connection pool
const pool = mysql.createPool({

    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME

});


//view users
exports.view = (req, res) =>{

    //connect to DB
     pool.getConnection((err, connection) =>{
     if(err) throw err; // not connected
     console.log('Connected as ID' + connection.threadId);

    //user the connection
    connection.query('SELECT * FROM user', (err, rows) =>{
        //when done with the connection , release it 
        connection.release();

        if(!err){
            res.render('home' , {rows});
        } else{
            console.log(err);
        }

        console.log('The data from table : \n' , rows);

    });
    });
}

//find user by search
exports.find = (req,res) =>{
        //connect to DB
        pool.getConnection((err, connection) =>{
            if(err) throw err; // not connected
            console.log('Connected as ID' + connection.threadId);

            let searchTerm = req.body.search;
       
           //user the connection
           connection.query('SELECT * FROM user where numberplate LIKE?' , ['%' + searchTerm + '%'], (err, rows) =>{
               //when done with the connection , release it 
               connection.release();
       
               if(!err){
                   res.render('home' , {rows});
               } else{
                   console.log(err);
               }
       
               console.log('The data from table : \n' , rows);
       
           });
       
           });

}

exports.form= (req,res) =>{
    res.render('add-user');
} 

//add new user
exports.create= (req,res) =>{
    const { numberplate, ownername , carmodel , carcolor } = req.body;
    let searchTerm = req.body.search;

        //connect to DB
        pool.getConnection((err, connection) =>{
            if(err) throw err; // not connected
            console.log('Connected as ID' + connection.threadId);

            
       
           //user the connection
           connection.query('INSERT INTO user SET numberplate = ? , ownername = ?, carmodel = ?, carcolor = ? ' , [numberplate,ownername,carmodel,carcolor],(err, rows) =>{
               //when done with the connection , release it 
               connection.release();
       
               if(!err){
                   res.render('add-user' , { alert : ' User succesefully added' });
               } else{
                   console.log(err);
               }
       
               console.log('The data from table : \n' , rows);
       
           });
       
           });
}

//edit user
exports.edit = (req,res) =>{


        //connect to DB
        pool.getConnection((err, connection) =>{
            if(err) throw err; // not connected
            console.log('Connected as ID' + connection.threadId);
       
           //user the connection
            connection.query('SELECT * FROM user WHERE numberplate= ? ' , [req.params.numberplate], (err, rows) =>{
               //when done with the connection , release it 
               connection.release();
       
               if(!err){
                   res.render('edit-user' , {rows});
               } else{
                   console.log(err);
               }
       
               console.log('The data from table : \n' , rows);
       
           });
           });

}


//update
exports.update = (req,res) =>{
    const { numberplate, ownername , carmodel , carcolor } = req.body;

    //connect to DB
    pool.getConnection((err, connection) =>{
        if(err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);
   
       //user the connection
        connection.query('UPDATE user SET numberplate = ?, ownername = ? , carmodel = ? , carcolor = ? WHERE numberplate = ? ' , [numberplate,ownername,carmodel,carcolor, req.params.numberplate], (err, rows) =>{
           //when done with the connection , release it 
           connection.release();
   
           if(!err){


        //connect to DB
        pool.getConnection((err, connection) =>{
            if(err) throw err; // not connected
            console.log('Connected as ID' + connection.threadId);
       
           //user the connection
            connection.query('SELECT * FROM user WHERE numberplate= ? ' , [req.params.numberplate], (err, rows) =>{
               //when done with the connection , release it 
               connection.release();
       
               if(!err){
                   res.render('edit-user' , {rows, alert : `${numberplate} has been updated `});
               } else{
                   console.log(err);
               }
       
               console.log('The data from table : \n' , rows);
       
           });
           });
            



           } else{
               console.log(err);
           }
   
           console.log('The data from table : \n' , rows);
   
       });
       });
}

//delete user
exports.delete = (req,res) =>{


    //connect to DB
    pool.getConnection((err, connection) =>{
        if(err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);
   
       //user the connection
        connection.query('DELETE FROM user WHERE numberplate= ? ' , [req.params.numberplate], (err, rows) =>{
           //when done with the connection , release it 
           connection.release();
   
           if(!err){
               res.redirect('/');
           } else{
               console.log(err);
           }
   
           console.log('The data from table : \n' , rows);
   
       });
       });

}


//view user detail
exports.viewall = (req, res) =>{

    //connect to DB
     pool.getConnection((err, connection) =>{
     if(err) throw err; // not connected
     console.log('Connected as ID' + connection.threadId);

    //user the connection
    connection.query('SELECT * FROM userdetail WHERE numberplate = ? ', [req.params.numberplate] , (err, rows) =>{
        //when done with the connection , release it 
        connection.release();

        if(!err){
            res.render('view-user' , {rows});
        } else{
            console.log(err);
        }

        console.log('The data from table : \n' , rows);

    });
    });
}

//find user by search
exports.find2 = (req,res) =>{
    //connect to DB
    pool.getConnection((err, connection) =>{
        if(err) throw err; // not connected
        console.log('Connected as ID' + connection.threadId);

        let searchTerm = req.body.search2;
   
       //user the connection
       connection.query('SELECT * FROM userdetail where intime LIKE?' , ['%' + searchTerm + '%'], (err, rows) =>{
           //when done with the connection , release it 
           connection.release();
   
           if(!err){
               res.render('view-user' , {rows});
           } else{
               console.log(err);
           }
   
           console.log('The data from table : \n' , rows);
   
       });
   
       });

}