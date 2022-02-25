const express = require("express");
const path = require("path");
const mysql = require('mysql2');
var url = require('url');
const port = process.env.PORT || 8081;
require("dotenv").config();
const userData = require("./data/userData.json");
const { load } = require("nodemon/lib/config");
const { log } = require("console");
var app = express();
//design and develop BY Maitrak Nirmal
//url encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set path for public dir
app.use(express.static(path.join(__dirname, "/public")));

//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

//set mysql connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'job_application'
});

// jobApp page render
app.get("/jobApp", (req, res) => {
  //
  sql_edu="SELECT value FROM `option_master` WHERE `s_id`=1;"
  sql_gender="SELECT name FROM `option_master` WHERE s_id=7; "
  sql_state="SELECT name FROM `option_master` WHERE s_id =8; "
  sql_tech="SELECT name FROM `option_master` WHERE s_id =5; "
sql_lang="SELECT name FROM select_master WHERE id=2 or id=3 or id=4; "
sql_dept="SELECT name,value FROM `option_master` WHERE s_id=10; "



  connection.query(sql_edu,function(err,edu)
  {
    connection.query(sql_gender,function(err,gender)
    {
      console.log(gender);
      connection.query(sql_state,function(err,state)
      {
        connection.query(sql_tech,function(err,tech)
        {
          connection.query(sql_lang,function(err,lang)
          {
            connection.query(sql_dept,function(err,dept)
            {
              res.render("jobApp",{edu:edu,gender:gender,state:state,tech:tech,lang:lang,dept:dept});
                
            }); 
              
          }); 
            
        }); 
          
      }); 
        
    }); 
      
  }); 





});
function testing(name,mode,param) {
  
if(mode=="create" & param=="ok")
{


  sql_dyna="SELECT option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE select_master.name='"+name+"' "
  connection.query(
    sql_dyna,
    function(err, results, fields) {
      //console.log(sql_dyna);
      //console.log(results);
      return results;
      
    });

  } 




}




//for the post jobApp form
app.post("/jobAppAction", (req, res) => {
  dataid=req.body.id;
  if(typeof(dataid)=="undefined")
  {
  


  
  try {
   

    var id;
    let cid;
    let edu1;

   //res.send(req.body);
    edu1=req.body.edu;
    work1=req.body.work;
    lang1=req.body.lang;
    tech1=req.body.tech;
    location1=req.body.location;
    ref1=req.body.ref
    
    //basic
    
     sql="INSERT INTO basic ( `fname`, `lname`, `email`, `designation`, `addr1`, `addr2`, `phone`, `zip`, `dob`, `gender`, `state_id`,`city`,`material_status`) VALUES ('"+req.body.fistname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.designation+"','"+req.body.addr1+"','"+req.body.addr2+"','"+req.body.phone+"','"+req.body.zip+"','"+req.body.dob+"','"+req.body.gender+"','"+req.body.state+"','"+req.body.city+"','"+req.body.materialStatus+"')"
    connection.query(
      sql,
      function(err, results, fields) {
        console.log(sql);
        id=results.insertId
        
     
      //education

      for (let i = 0; i < edu1.length; i++) 
      {
       
        
        
        sql_option='SELECT option_master.id as option from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value="'+req.body.edu[i]['courseName']+'"';
    
        connection.query(
          sql_option,
          function(err, results, fields) {
            
            
            cid=results[0].option;
            

            //sql_education="INSERT INTO `edu_detail`( `u_id`, `option_id`, `university`, `passing_year`, `percentage`) VALUES ('"+id+"','"+cid+"','"+uname+"','"+year+"','"+perc+"')"

            sql_education="INSERT INTO `edu_detail`( `u_id`, `option_id`, `university`, `passing_year`, `percentage`) VALUES ";
            var1="('"+id+"'";
            var1=var1+",'"+cid+"'";
            var1=var1+",'"+req.body.edu[i]['universityName']+"'";
            var1=var1+",'"+req.body.edu[i]['passingYear']+"'";
            var1=var1+",'"+req.body.edu[i]['percentage']+"')";
            sql_education+=var1;
                  console.log(sql_education);
                  connection.query(
                    sql_education,
                    function(err, results, fields) {
                      console.log(results);
                  });
                  
          });

      }



      //work
      for (let i = 0; i < work1.length; i++) {
      cname=work1[i]["companyName"]
      des=work1[i]["designation"]
      from=work1[i]["from"]
      to=work1[i]["to"]


            sql_work="INSERT INTO `work_exp_detail`(`u_id`, `company_name`, `designation`, `from_date`, `to_date`) VALUES ('"+id+"','"+cname+"','"+des+"','"+from+"','"+to+"')"
            connection.query(
              sql_work,
              function(err, results, fields) {
                console.log(err);    
        }
        );
      }
      

      //lang

      for (let i = 0; i <lang1.length; i++) {
        let lname=lang1[i]["language"]
        let lread =lang1[i]["read"]
        let lwrite=lang1[i]["write"]
        let lspeak=lang1[i]["speak"]

        let lcheck1=lname+"_"+lread;
        let lcheck2=lname+"_"+lwrite;
        let lcheck3=lname+"_"+lspeak;
        console.log(lcheck1);
        
        sql_check="SELECT option_master.s_id,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+lcheck1+"' or option_master.value='"+lcheck2+"' or option_master.value='"+lcheck3+"'";
        connection.query(
          sql_check,
          function(err, results, fields) {
            console.log("option",err);
            console.log("option result",results);    

            

            for (let j = 0; j < results.length; j++) {
              console.log("check",results[j].id); 
              sql_lang="INSERT INTO `Language_detail`(`u_id`, `option_id`) VALUES ('"+id+"','"+results[j].id+"')"
              connection.query(
                sql_lang,
                function(err, insert, fields) {
                  console.log("insert",err);    
                  console.log("insert",insert);
          }
          );
              
            }
            

            }
            );

      }

      //tech
      
      for (let i = 0; i < tech1.length; i++) {
        let tname=tech1[i]["technology"];
        let tstatus=tech1[i]["status"];
        console.log("tech");
        sql_check1="SELECT option_master.s_id option,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+tname+"'";
        console.log(sql_check1);
          connection.query(
            sql_check1,
          function(err, results1, fields) {
            console.log(err);    
            console.log(results1);
           let oid=results1[0].option;

            sql_tech="INSERT INTO `technology_detail`( `u_id`, `option_id`,`status`) VALUES ('"+id+"','"+oid+"','"+tstatus+"')"
            connection.query(
              sql_tech,
              function(err, results, fields) {
                console.log(err);    
        }
        );
            

            }
            );

      } 
      //location
      for (let i = 0; i < location1.length; i++) {
       
        locaname=location1[i];
        sql_check2="SELECT option_master.s_id,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+locaname+"'";
        connection.query(
          sql_check2,
          function(err, results3, fields) {
            console.log(err);    
            console.log(results3);
            let lid=results3[0].id;

            sql_loca="INSERT INTO `Preferance_detail`( `u_id`, `location_option_id`, `notice_period`, `current_ctc`, `exp_ctc`, `dept_option_id`) VALUES ('"+id+"','"+lid+"','"+req.body.noticePeriod+"','"+req.body.currentCTC+"','"+req.body.expectedCTC+"','"+req.body.department+"')"
            connection.query(
              sql_loca,
              function(err, results3, fields) {
                console.log(err);
              }
            );


        }
        );
        
      }


      //reff
      for (let i = 0; i < ref1.length; i++) {
        rname=ref1[i]["refName"]
        rcontact=ref1[i]["refContact"]
        relation=ref1[i]["refRelation"]
        
  
  
              sql_work="INSERT INTO `reff_`( `u_id`, `name`, `contact_no`, `relation`) VALUES ('"+id+"','"+rname+"','"+rcontact+"','"+relation+"')"
              connection.query(
                sql_work,
                function(err, results, fields) {
                  console.log(err);    
          }
          );
        } 



    }
    );  
    res.redirect("/getdata")
    } catch (err) {
    console.log(err.message);
  }
}
else
{

  ///---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  try {
   

    var id;
    let cid;
    let edu1;
    let cnt=0;
   res.send(req.body);
    edu1=req.body.edu;
    work1=req.body.work;
    lang1=req.body.lang;
    tech1=req.body.tech;
    location1=req.body.location;
    ref1=req.body.ref
    console.log(dataid);
    
   sql_del1="DELETE edu_detail FROM edu_detail INNER JOIN basic ON edu_detail.u_id=basic.id WHERE edu_detail.u_id ="+dataid;
    sql_del2="DELETE Language_detail FROM Language_detail INNER JOIN basic ON Language_detail.u_id=basic.id WHERE Language_detail.u_id ="+dataid;
    sql_del3="DELETE Preferance_detail FROM Preferance_detail INNER JOIN basic ON Preferance_detail.u_id=basic.id WHERE Preferance_detail.u_id ="+dataid;
    sql_del4="DELETE reff_ FROM reff_ INNER JOIN basic ON reff_.u_id=basic.id WHERE reff_.u_id = "+dataid;
    sql_del5="DELETE technology_detail FROM technology_detail INNER JOIN basic ON technology_detail.u_id=basic.id WHERE technology_detail.u_id ="+dataid;
    sql_del6="DELETE work_exp_detail FROM work_exp_detail INNER JOIN basic ON work_exp_detail.u_id=basic.id WHERE work_exp_detail.u_id ="+dataid;
  connection.query(
    sql_del1,
    function(err, results, fields) {

      if(err){cnt++;}
    }
    );
    connection.query(
     sql_del2,
      function(err, results, fields) {
  
        if(err){cnt++;}
      }
      );
      connection.query(
        sql_del3,
        function(err, results, fields) {
    
          if(err){cnt++;}
        }
        );
        connection.query(
          sql_del4,
          function(err, results, fields) {
      
            if(err){cnt++;}
          }
          );
          connection.query(
            sql_del5,
            function(err, results, fields) {
        
              if(err){cnt++;}
            }
            );
            connection.query(
              sql_del6,
              function(err, results, fields) {
                if(err){cnt++;}
                
              }
              );
              
      if(cnt>0)    
      {
          console.log("testing");
      }
      else
      {
//basic
    console.log("hello");
//sql="INSERT INTO basic (`id`, `fname`, `lname`, `email`, `designation`, `addr1`, `addr2`, `phone`, `zip`, `dob`, `gender`, `state_id`,`city`,`material_status`)
// VALUES ('"+dataid+"','"+req.body.fistname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.designation+"','"+req.body.addr1+"','"+req.body.addr2+"','"+req.body.phone+"','"+req.body.zip+"','"+req.body.dob+"','"+req.body.gender+"','"+req.body.state+"','"+req.body.city+"','"+req.body.materialStatus+"')"
sql="UPDATE `basic` SET `fname`='"+req.body.fistname+"',`lname`='"+req.body.lastname+"',`email`='"+req.body.email+"',`designation`='"+req.body.designation+"',`addr1`='"+req.body.addr1+"',`addr2`='"+req.body.addr2+"',`phone`='"+req.body.phone+"',`zip`='"+req.body.zip+"',`dob`='"+req.body.dob+"',`gender`='"+req.body.gender+"',`state_id`='"+req.body.state+"',`city`='"+req.body.city+"',`material_status`='"+req.body.materialStatus+"' where id="+dataid
console.log("hello edit");
connection.query(
  sql,
  function(err, results, fields) {
    console.log(err);
    id=dataid;
    

  //tech
  
  for (let i = 0; i < tech1.length; i++) {
  
    
    sql_tech="SELECT option_master.s_id option,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+tech1[i]['technology']+"'";
    console.log(sql_tech);
      connection.query(
        sql_tech,
      function(err, techresult, fields) {
          
        console.log("sql",sql_tech);
        console.log("tech",techresult);
        console.log(err);
       oid=techresult[0].id;
       
       

        sql_tech_insert="INSERT INTO `technology_detail`( `u_id`, `option_id`,`status`) VALUES ('"+id+"','"+oid+"','"+tech1[i]['status']+"')"
        console.log(sql_tech_insert);
        connection.query(
          sql_tech_insert,
          function(err, results, fields) {
            console.log(err);
              
    }
    );
        

        }
        );

  } 

 
  //education

  for (let i = 0; i < edu1.length; i++) 
  {
   
    
    
    sql_option='SELECT option_master.id as option from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value="'+req.body.edu[i]['courseName']+'"';

    connection.query(
      sql_option,
      function(err, results, fields) {
        console.log(sql_option);
        
        cid=results[0].option;
        

        //sql_education="INSERT INTO `edu_detail`( `u_id`, `option_id`, `university`, `passing_year`, `percentage`) VALUES ('"+id+"','"+cid+"','"+uname+"','"+year+"','"+perc+"')"

        sql_education="INSERT INTO `edu_detail`( `u_id`, `option_id`, `university`, `passing_year`, `percentage`) VALUES ";
        var1="('"+id+"'";
        var1=var1+",'"+cid+"'";
        var1=var1+",'"+req.body.edu[i]['universityName']+"'";
        var1=var1+",'"+req.body.edu[i]['passingYear']+"'";
        var1=var1+",'"+req.body.edu[i]['percentage']+"')";
        sql_education+=var1;
              console.log(sql_education);
              connection.query(
                sql_education,
                function(err, results, fields) {
                  console.log(results);
              });
              
      });

  }



  //work
  for (let i = 0; i < work1.length; i++) {
  cname=work1[i]["companyName"]
  des=work1[i]["designation"]
  from=work1[i]["from"]
  to=work1[i]["to"]


        sql_work="INSERT INTO `work_exp_detail`(`u_id`, `company_name`, `designation`, `from_date`, `to_date`) VALUES ('"+id+"','"+cname+"','"+des+"','"+from+"','"+to+"')"
        connection.query(
          sql_work,
          function(err, results, fields) {
            console.log(err);    
    }
    );
  }
  

  //lang

  for (let i = 0; i < lang1.length; i++) {
    let lname=lang1[i]["language"]
    let lread =lang1[i]["read"]
    let lwrite=lang1[i]["write"]
    let lspeak=lang1[i]["speak"]

    let lcheck1=lname+"_"+lread;
    let lcheck2=lname+"_"+lwrite;
    let lcheck3=lname+"_"+lspeak;
    
    sql_check="SELECT option_master.s_id,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+lcheck1+"' or option_master.value='"+lcheck2+"' or option_master.value='"+lcheck3+"'";
    connection.query(
      sql_check,
      function(err, results, fields) {
        console.log(err);
        console.log(results);    

        for (let j = 0; j < results.length; j++) {
          sql_lang="INSERT INTO `Language_detail`(`u_id`, `option_id`) VALUES ('"+id+"','"+results[j].id+"')"
          connection.query(
            sql_lang,
            function(err, insert, fields) {
              console.log(err);    
              console.log(insert);
      }
      );
          
        }
        

        }
        );

  }


  //location
  for (let i = 0; i < location1.length; i++) {
   
    locaname=location1[i];
    sql_check2="SELECT option_master.s_id,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+locaname+"'";
    connection.query(
      sql_check2,
      function(err, results3, fields) {
        console.log(err);    
        console.log(results3);
        let lid=results3[0].id;

        sql_loca="INSERT INTO `Preferance_detail`( `u_id`, `location_option_id`, `notice_period`, `current_ctc`, `exp_ctc`, `dept_option_id`) VALUES ('"+id+"','"+lid+"','"+req.body.noticePeriod+"','"+req.body.currentCTC+"','"+req.body.expectedCTC+"','"+req.body.department+"')"
        connection.query(
          sql_loca,
          function(err, results3, fields) {
            console.log(err);
          }
        );


    }
    );
    
  }


  //reff
  for (let i = 0; i < ref1.length; i++) {
    rname=ref1[i]["refName"]
    rcontact=ref1[i]["refContact"]
    relation=ref1[i]["refRelation"]
    


          sql_work="INSERT INTO `reff_`( `u_id`, `name`, `contact_no`, `relation`) VALUES ('"+id+"','"+rname+"','"+rcontact+"','"+relation+"')"
          connection.query(
            sql_work,
            function(err, results, fields) {
              console.log(err);    
      }
      );
    } 



}
);  
      }
      
  

    
    
     // res.redirect("/getdata")
    } catch (err) {
    console.log(err.message);
  }
}
});

// const userRoutes = require("./src/routes/user/userRoutes");
// const authRoutes = require("./src/routes/auth/authRoutes");

//set routes
// app.use(userRoutes);
// app.use(authRoutes);

app.get("/getdata", (req, res) => {
  //
   sql1="Select * from basic";
  connection.query(
    sql1,
    function(err, results, fields) {
        
      res.render("showdata",{results:results});
  }
  );
});


app.get("/edit", (req, res) => {
  //
  try {
    let stdid=req.query.id;
    
    let location = [];
    let location1 = [];
    id=stdid
    console.log(stdid);
    sql1="Select * from basic where id="+id;
    sql2="SELECT * FROM `edu_detail` WHERE `u_id`="+id;
    sql3="SELECT * FROM `option_master`";
    sql4="SELECT * FROM `work_exp_detail` WHERE `u_id`="+id;
    sql5="SELECT * FROM `Language_detail` WHERE `u_id`="+id;
    sql6="SELECT * FROM `technology_detail` WHERE `u_id`="+id;
    sql7="SELECT * FROM `reff_` WHERE `u_id`="+id;
    sql8="SELECT * FROM `Preferance_detail` WHERE `u_id`="+id;
    sqllang1="SELECT select_master.name FROM Language_detail INNER JOIN option_master on Language_detail.option_id=option_master.id INNER JOIN select_master ON option_master.s_id =select_master.id where Language_detail.u_id = "+id+" GROUP by select_master.name; "
    sqllang2="SELECT option_master.value from Language_detail INNER JOIN option_master on Language_detail.option_id=option_master.id inner JOIN select_master on option_master.s_id= select_master.id where Language_detail.u_id="+id+"; "
    

      

       





    console.log(sql1);
    connection.query(
      sql1,
      function(err, results1, fields) {   
        
        connection.query(
          sqllang1,
          function(err, lan1, fields) {
            console.log(lan1);
            connection.query(
              sqllang2,
              function(err, lan2, fields) { 
      
                  let mappedArray=lan2.map(lan2=>lan2.value)
                  console.log(mappedArray);

                  connection.query(sql2,function(err, results2, fields) {    
                 
                  
                
                  
                    connection.query(sql3,function(err, option, fields) {    
                                   
   
                                          connection.query(sql4,function(err, results3, fields) {    
                                                      
                                                  connection.query(sql5,function(err, results4, fields) {    
                                                            
                                                        
                                                            connection.query(sql6,function(err, results5, fields) {    
                                                              connection.query(sql7,function(err, results6, fields) {    
                                                                connection.query(sql8,function(err, results7, fields) {    
                                                             // console.log(results7[0].location_option_id);
                                                             for (let i = 0; i < results7.length; i++) {
                                                               location[i]=results7[i].location_option_id
                                                               
                                                             }
                                                             for (let i = 0; i < results7.length; i++) {
                                                             var1=results7[i].location_option_id
                
                                                             var2="";
                                                             for(var j=0;j<option.length;j++)
                                                             {
                                                               
                                                                if(option[j].id==var1)
                                                                {
                                                                 location1[i]=option[j].value;
                                                                 
                                                                  
                                                                  
                                                                }
                                                             }
                                                            }
  
  
                                                            
                                                             
                                                             
                                                            
                                                            if(req.query.view=="enable")
                                                            {
                                                              view="enable"
                                                                  res.render("editdata",{results1:results1,results2:results2,option:option,results3:results3,results4:results4,results5:results5,results6:results6,results7:results7,location1,location1,stdid:stdid,view:view,lan1:lan1,lan2:lan2,mappedArray:mappedArray});                
                                                            }
                                                            else
                                                            {
                                                              view="disable"
                                                              console.log(view);
                                                              res.render("editdata",{results1:results1,results2:results2,option:option,results3:results3,results4:results4,results5:results5,results6:results6,results7:results7,location1,location1,stdid:stdid,view:view,lan1:lan1,lan2:lan2,mappedArray:mappedArray});                
  
                                                            }
                                                                         }); 
                                                          
                                                                                
                      
                                                                       });    
                                                             
                                                          
                                                                     
            
                                                             });                  
          
                                                  });       
                                                          
  
                                          });
  
                               });
                   });


      
               });

           });
               
                
                 


        
        
      });
      
      
  } catch (error) {
    console.log(error);
  }
    
});

app.get("/remove", (req, res) => {
  //

  let id=req.query.id;
   sql_del="DELETE FROM `basic` WHERE `id`="+id

  connection.query(
    sql_del,
    function(err, results, fields) {
      console.log(err);    
      
  }
  );
  res.redirect("/getdata")
});


app.get("/ajax", (req, res) => {
  //
try {
  
  let name=req.query.q;
   sql_del='SELECT id,fname FROM `basic` WHERE fname like "'+name+'%"'
   str="";
console.log(sql_del);
  connection.query(
    sql_del,
    function(err, results, fields) {
      console.log("testing");
      for (let i = 0; i < results.length; i++) {
        str+="<p>"+results[i].id +"-"+results[i].fname+"</p>"
        str+="------------------------- "
        
      }
      res.send(str)
  }
  );
} catch (error) {
  
}
  
});


///----------------------------ajax---------------------------
app.get("/insert_basic", (req, res) => {
  //
str=""
   sql="INSERT INTO basic ( `fname`, `lname`, `email`, `designation`, `addr1`, `addr2`, `phone`, `zip`, `dob`, `gender`, `state_id`,`city`,`material_status`) VALUES ('"+req.query.firstname+"','"+req.query.lastname+"','"+req.query.email+"','"+req.query.designation+"','"+req.query.addr1+"','"+req.query.addr2+"','"+req.query.phone+"','"+req.query.zip+"','"+req.query.dob+"','"+req.query.gender+"','"+req.query.state+"','"+req.query.city+"','"+req.query.materialStatus+"')"
    connection.query(
      sql,
      function(err, results, fields) {
        console.log(results);
        id=results.insertId
       str+= '<input type="hidden" name="id" id="id" value="'+id+'">'
        res.send(str)
      });
      
});

app.get("/insert_update", (req, res) => {
  //

  sql="UPDATE `basic` SET `fname`='"+req.query.firstname+"',`lname`='"+req.query.lastname+"',`email`='"+req.query.email+"',`designation`='"+req.query.designation+"',`addr1`='"+req.query.addr1+"',`addr2`='"+req.query.addr2+"',`phone`='"+req.query.phone+"',`zip`='"+req.query.zip+"',`dob`='"+req.query.dob+"',`gender`='"+req.query.gender+"',`state_id`='"+req.query.state+"',`city`='"+req.query.city+"',`material_status`='"+req.query.materialStatus+"' where id="+req.query.id
  console.log("hello edit");
  connection.query(
    sql,
    function(err, results, fields) {
      console.log(err);
      
    });  
      
});

app.get("/insert_edu", (req, res) => {
  //

  sql_del1="DELETE edu_detail FROM edu_detail INNER JOIN basic ON edu_detail.u_id=basic.id WHERE edu_detail.u_id ="+req.query.id;
  connection.query(
    sql_del1,
    function(err, results, fields) {
      
      console.log("del",err);

    });



  sql_option='SELECT option_master.id as option from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value="'+req.query.cname+'"';
  connection.query(
    sql_option,
    function(err, results, fields) {
      
      
      cid=results[0].option;


  sql="INSERT INTO `edu_detail`( `u_id`, `option_id`, `university`, `passing_year`, `percentage`) VALUES ('"+req.query.id+"','"+cid+"','"+req.query.uniname+"','"+req.query.year+"','"+req.query.perc+"')"
  connection.query(
      sql,
      function(err, results, fields) {
        
        console.log(err);

      });
    });
      
});

app.get("/insert_work", (req, res) => {

  console.log("",req.query.i);
if(req.query.i==0)
{
  sql_del6="DELETE work_exp_detail FROM work_exp_detail INNER JOIN basic ON work_exp_detail.u_id=basic.id WHERE work_exp_detail.u_id ="+req.query.id;
  connection.query(
    sql_del6,
    function(err, results, fields) {
      console.log(req.query.id);    
}
);
}
  //
  sql_work="INSERT INTO `work_exp_detail`(`u_id`, `company_name`, `designation`, `from_date`, `to_date`) VALUES ('"+req.query.id+"','"+req.query.work+"','"+req.query.designation+"','"+req.query.from+"','"+req.query.to+"')"
  connection.query(
    sql_work,
    function(err, results, fields) {
      console.log(err);    
}
);
      
});


app.get("/insert_lang", (req, res) => {
  //

  sql_del2="DELETE Language_detail FROM Language_detail INNER JOIN basic ON Language_detail.u_id=basic.id WHERE Language_detail.u_id ="+req.query.id;
  console.log(sql_del2);
  connection.query(
    sql_del2,
    function(err, insert, fields) {
      console.log("del lang");




  let lcheck1=req.query.lang+"_"+req.query.read;
  let lcheck2=req.query.lang+"_"+req.query.write;
  let lcheck3=req.query.lang+"_"+req.query.speak;
  console.log(lcheck1);
  
  
  sql_check="SELECT option_master.s_id,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+lcheck1+"' or option_master.value='"+lcheck2+"' or option_master.value='"+lcheck3+"'";
  connection.query(
    sql_check,
    function(err, results, fields) {
      console.log("option",err);
      console.log("option result",results);    

      

      for (let j = 0; j < results.length; j++) {
        console.log("check",results[j].id); 
        sql_lang="INSERT INTO `Language_detail`(`u_id`, `option_id`) VALUES ('"+req.query.id+"','"+results[j].id+"')"
        connection.query(
          sql_lang,
          function(err, insert, fields) {
            console.log("insert",err);    
            console.log("insert",insert);
    }
    );
        
      }
      

      }
      );
    }
    );

});

app.get("/insert_tech", (req, res) => {
  //

  sql_del5="DELETE technology_detail FROM technology_detail INNER JOIN basic ON technology_detail.u_id=basic.id WHERE technology_detail.u_id ="+req.query.id;
  connection.query(
    sql_del5,
    function(err, results, fields) {
      console.log(err);    
}
);
  let tname=req.query.tech
  let tstatus=req.query.status;
  console.log("tech");
  sql_check1="SELECT option_master.s_id option,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+tname+"'";
  console.log(sql_check1);
    connection.query(
      sql_check1,
    function(err, results1, fields) {
      console.log(err);    
      console.log(results1);
     let oid=results1[0].id;

      sql_tech="INSERT INTO `technology_detail`( `u_id`, `option_id`,`status`) VALUES ('"+req.query.id+"','"+oid+"','"+tstatus+"')"
      console.log(sql_tech);
      connection.query(
        sql_tech,
        function(err, results, fields) {
          console.log(err);    
  }
  );
      

      }
      );
      
});

app.get("/insert_reff", (req, res) => {
  //

  sql_del4="DELETE reff_ FROM reff_ INNER JOIN basic ON reff_.u_id=basic.id WHERE reff_.u_id = "+req.query.id;
  connection.query(
    sql_del4,
    function(err, results, fields) {
      console.log(err);    
}
);
  console.log("reff");
  sql_work="INSERT INTO `reff_`( `u_id`, `name`, `contact_no`, `relation`) VALUES ('"+req.query.id+"','"+req.query.name+"','"+req.query.contact+"','"+req.query.relation+"')"
  connection.query(
    sql_work,
    function(err, results, fields) {
      console.log(err);    
}
);
});


app.post("/insert_reff_post", (req, res) => {
  //

let obj_reff=req.body;
console.log(obj_reff.i);

if(obj_reff.i==0)
{
  sql_del4="DELETE reff_ FROM reff_ INNER JOIN basic ON reff_.u_id=basic.id WHERE reff_.u_id = "+obj_reff.id;
  console.log(sql_del4);
  connection.query(
    sql_del4,
    function(err, results, fields) {
      console.log("del pref",err);    
}
);
}


  console.log("reff");
  sql_work="INSERT INTO `reff_`( `u_id`, `name`, `contact_no`, `relation`) VALUES ('"+obj_reff.id+"','"+obj_reff.name+"','"+obj_reff.contact+"','"+obj_reff.relation+"')"
  connection.query(
    sql_work,
    function(err, results, fields) {
      console.log(results);    
      console.log("testing");
}
);
});




app.get("/insert_pref", (req, res) => {
  //
  sql_del3="DELETE Preferance_detail FROM Preferance_detail INNER JOIN basic ON Preferance_detail.u_id=basic.id WHERE Preferance_detail.u_id ="+req.query.id;
  connection.query(
    sql_del3,
    function(err, results3, fields) {
      console.log(err);
    }
  );

  console.log("testing");
  sql_check2="SELECT option_master.s_id,select_master.id ,option_master.id,option_master.name from option_master LEFT JOIN select_master on select_master.id=option_master.s_id WHERE option_master.value='"+req.query.values+"'";
  connection.query(
    sql_check2,
    function(err, results3, fields) {
      console.log(err);    
      console.log(results3);
      let lid=results3[0].id;

      sql_loca="INSERT INTO `Preferance_detail`( `u_id`, `location_option_id`, `notice_period`, `current_ctc`, `exp_ctc`, `dept_option_id`) VALUES ('"+req.query.id+"','"+lid+"','"+req.query.noticePeriod+"','"+req.query.currentCTC+"','"+req.query.expectedCTC+"','"+req.query.department+"')"
      console.log(sql_loca);
      connection.query(
        sql_loca,
        function(err, results3, fields) {
          console.log(err);
        }
      );


  }
  );
   
  
}
);
  


//home page
app.use("/", (req, res) => {
  res.render("index", { userData });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
