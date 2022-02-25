// education table
let edu_counter = 1;
function onAddEduRow() {
  let table = document.getElementById("eductaionTable");

  let row = table.insertRow();
  row.id = "edu" + edu_counter;

  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();
  let cell5 = row.insertCell();

  cell1.innerHTML =
    "<label for='courseName" + edu_counter +"'>Course: </label>" +
    "<select name='education["+edu_counter+"][courseName]' id='courseName" +edu_counter +"'>" +
    "<option value='select' selected disabled>Select</option> <option value='ssc'>SSC</option> <option value='hsc'>HSC</option> <option value='bachelor'>Bachelors</option> <option value='master'>Masters</option> </select > ";
  cell2.innerHTML =
    "<label for='universityName" +edu_counter +"'>University</label>" +
    "<input type='text' name='education["+edu_counter+"][universityName] id='universityName" + edu_counter +"'>";
  cell3.innerHTML =
    "<label for='passingYear" + edu_counter +"'>Passing Year: </label>" +
    "<input type='text' name='education["+edu_counter +"][passingYear] id='passingYear" + edu_counter + "'>";
  cell4.innerHTML =
    "<label for='percentage" + edu_counter + "'>Percentage: </label>" +
    "<input type='text' name='education["+edu_counter +"][percentage]  id='percentage " + edu_counter + "'>";
  cell5.innerHTML =
    "<input type='button' value='-' name='removeRow" +
    edu_counter +
    "' id='removeRow" +
    edu_counter +
    "' onclick=onRemoveRow('edu" +
    edu_counter +
    "')>";

  edu_counter = edu_counter + 1;
}

// work experience table
let wx_counter = 2;
function onAddwxRow() {
  let table = document.getElementById("workExTable");

  let row = table.insertRow();
  row.id = "wx" + wx_counter;

  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();
  let cell5 = row.insertCell();

  cell1.innerHTML =
    "<label for='companyName" +
    wx_counter +
    "'>Comapny Name:</label> <input type='text' name='companyName" +
    wx_counter +
    "' id=companyName" +
    wx_counter +
    "'>";
  cell2.innerHTML =
    "<label for='designation" +
    wx_counter +
    "'>Designation:</label> <input type='text' name='designation" +
    wx_counter +
    "' id='designation" +
    wx_counter +
    "'>";
  cell3.innerHTML =
    "<label for='from" +
    wx_counter +
    "'>From:</label> <input type='date' name='from" +
    wx_counter +
    "' id='from" +
    wx_counter +
    "'>";
  cell4.innerHTML =
    "<label for='to" +
    wx_counter +
    "'>To:</label> <input type='date' name='to" +
    wx_counter +
    "' id='to" +
    wx_counter +
    "'>";
  cell5.innerHTML =
    "<input type='button' value='-' name='removeRow" +
    wx_counter +
    "' id='removeRow" +
    wx_counter +
    "' onclick=onRemoveRow('wx" +
    wx_counter +
    "')>";

  wx_counter = wx_counter + 1;
}

// reference table
let ref_counter = 2;
function onAddRefRow() {
  let table = document.getElementById("refTable");

  let row = table.insertRow();
  row.id = "ref" + ref_counter;

  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();

  cell1.innerHTML =
    "<label for='refName" +
    ref_counter +
    "'>Name:</label> <input type='text' name='refName" +
    ref_counter +
    "' id='refName" +
    ref_counter +
    "'>";
  cell2.innerHTML =
    "<label for='refcontact" +
    ref_counter +
    "'>Contact Number:</label> <input type='tel' name='refContact" +
    ref_counter +
    "' id='refContact" +
    ref_counter +
    "'>";
  cell3.innerHTML =
    "<label for='refRelation" +
    ref_counter +
    "'>Relation:</label> <input type='text' name='refRelation" +
    ref_counter +
    "' id='refRelation" +
    ref_counter +
    "'>";
  cell4.innerHTML =
    "<td colspan='2'> <input type='button' value='-'' name='removeRow" +
    ref_counter +
    "' id='removeRow" +
    ref_counter +
    "' onclick=onRemoveRow('ref" +
    ref_counter +
    "')> </td>";

  ref_counter = ref_counter + 1;
}

// language table

function onAddLanRow() {
  let table = document.getElementById("lanTable");

  let lan_counter = 2;
  let row = table.insertRow();
  row.id = 'lan'+lan_counter;

  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();
  let cell5 = row.insertCell();

  cell1.innerHTML =
    "<select name='language' id='language'><option value='lan_select' selected disabled>Select</option><option value='english'>English</option><option value='hindi'>Hindi</option><option value='gujarati'>Gujarati</option></select>";
  cell2.innerHTML =
    "<input type='checkbox' value=true  name='read'>Read" ;
  cell3.innerHTML=
    "<input type='checkbox' value=true name='write'>Write " ;
  cell4.innerHTML=
    "<input type = 'checkbox' value=true name = 'speak'>Speak ";
  cell5.innerHTML =
    "<input type='button' value='-' name='removeRow' id='removeRow' onclick=onRemoveRow('lan"+lan_counter +"')>";

  lan_counter = lan_counter + 1;
}

// Technology Table

function onAddTechRow() {
  let table = document.getElementById("techTable");

  let tech_counter = 2;
  let row = table.insertRow();
  row.id = "tech" + tech_counter;

  let cell1 = row.insertCell();
  let cell2 = row.insertCell();
  let cell3 = row.insertCell();
  let cell4 = row.insertCell();
  let cell5 = row.insertCell();

  cell1.innerHTML =
    "<select name='technology' id='technology'>"+
      "<option value='select' selected disabled>Select</option>"+
      "<option value='javascript'>JavaScript</option>"+
      "<option value='php'>PHP</option>"+
    "<option value='nodejs'>NodeJS</option><option value=''>Python</option></select>";
  cell2.innerHTML =
    "<input type='radio' name='beginer' /> Beginer";
  cell3.innerHTML = 
    "<input type='radio' name='mediocre' /> Mediocre";
  cell4.innerHTML =
    "<input type='radio' name='expert' /> Expert";
  cell5.innerHTML =
    "<input type='button' value= '-' name='removeRow'  id='removeRow' onclick=onRemoveRow('tech"+tech_counter+"') />";

  tech_counter = tech_counter + 1;
}

function onRemoveRow(rowid) {
  if (confirm("Are you sure you want to delete record?") == true) {
    let row = document.getElementById(rowid);
    row.parentNode.removeChild(row);
  }
}

function validateForm() {

  var add = document.getElementById("addr1").value;
  var mail = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var zipcode = document.getElementById("zip").value;

  var addressregx = /^[a-zA-Z0-9\s,'-]*$/ ;
  var mailregx = /^([a-zA-Z0-9\.]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)(.[a-z]+)?$/;
  var phoneregx = /^[789]\d{9}$/;
  var zipregx = /^[1-9][0-9]{5}$/;

  if (!addressregx.test(add)) {
    document.getElementById("showmsgadd").innerHTML = "*Address is not correct !";
    return false;
  }

  if (!mailregx.test(mail)) {
    document.getElementById("showmsgemail").innerHTML = "*Email is not correct !";
    return false;
  }

  if (!phoneregx.test(phone)) {
    document.getElementById("showmsgphone").innerHTML = "*Phone number is not correct !";
    return false;
  }
  if (!zipregx.test(zipcode)) {
    document.getElementById("showmsgzip").innerHTML = "*Zipcode is not correct !";
    return false;
  }

  var gen = document.forms["job_app"]["gender"];
  if (gen[0].checked==false && gen[1].checked == false) {
    document.getElementById("showmsgGender").innerHTML = "*Please enter your gender";
    return false;
  }

    if(genderM.checked==false && genderF.checked==false ) {
        
        return false;
    }   

  var uniptr = /^[a-zA-Z\s]*$/;
  var uniyearptr = /^[1-9]{1}[0-9]{3}$/;
  var uniperptr = /^[0-9]{2}[.][0-9]{2}$/;
  var rows_count = document.getElementById('eductaionTable').getElementsByTagName('tr');
  for (var i = 1; i <= rows_count.length; i++) {
    var str = "universityName" + i;
    var str1 = "passingYear" + i;
    var str2 = "percentage" + i;
    var uni = document.getElementById(str).value;
    var uniyear = document.getElementById(str1).value;
    var uniper = document.getElementById(str2).value;

    if (!uni.match(uniptr)) {
      alert("false uni");
    }

    if (!uniyear.match(uniyearptr)) {
      alert("false uni year");
    }
    if (!uniper.match(uniperptr)) {
      alert("false uni per");
    }
  }
}
function submit_form()
{


var fname =document.getElementById("fname");



var lname =document.getElementById("lastname").value;
var designation = document.getElementById("designation").value;
var email = document.getElementById("email").value;
var city = document.getElementById("city").value;
var zip = document.getElementById("zip").value;
var addr1 =document.getElementById("addr1").value;
var addr2 =document.getElementById("addr2").value;
var current_CTC= document.getElementById("currentCTC").value
var expected_CTC= document.getElementById("expectedCTC").value
var notice_Period=document.getElementById("noticePeriod").value
var cv=document.getElementById("resume").value
var rows_count = document.getElementById('eductaionTable').getElementsByTagName('tr');
var rows_count1 = document.getElementById('workExTable').getElementsByTagName('tr');
var rows_count2 = document.getElementById('refTable').getElementsByTagName('tr');
var rows_count3 = document.getElementById('lanTable').getElementsByTagName('tr');
var rows_count4 = document.getElementById('techTable').getElementsByTagName('tr');



var nameptr = /^[a-zA-Z\s]*$/;

var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var zipptr = /^[1-9]{1}[0-9]{5}$/
var addr = /^[a-zA-Z\s1-9]{0,200}$/
var uniptr = /^[a-zA-Z\s]*$/;
var uniyearptr = /^[1-9]{1}[0-9]{3}$/;
var uniperptr = /^[0-9]{2}[.][0-9]{2}$/;
var dateptr=/^[1-9]{4}[-][0-9]{2}[-][0-9]{2}$/;
var contact=/^[+]{1}[0-9]*$/;
var ctc = /^[0-9a-zA-Z.\s]*$/;
var noticeptr=/^[0-9\s]*$/;
var cvptr = /[pdf]$/;
var desptr = /^[a-zA-Z\s1-9]*$/;

console.log("testing")
if(!fname.match(nameptr))
{
  
  alert("first false");
   

}
if(!lname.match(nameptr))
{
  alert("last false");
   

}
if(!designation.match(desptr))
{
  alert("des false");
   

}

if(!email.match(emailformat))
{
alert("email false");
 

}
if(!city.match(desptr))
{
  alert("city false");
   

}
if(!zip.match(zipptr))
{
  alert("zip false");
   

}
if(!addr1.match(addr))
{
  alert("addr1 false");
   

}
if(!addr2.match(addr))
{
  alert("addr2 false");
   

}


for(i=1;i<=rows_count.length;i++)
{
  var str="universityName"+i;
  var str1="passingYear"+i;
  var str2="percentage"+i;
  var uni =document.getElementById(str).value;
  var uniyear =document.getElementById(str1).value;
  var uniper =document.getElementById(str2).value;
  
  if(!uni.match(uniptr))
  {
    alert("false uni")
     

  }
  
  if(!uniyear.match(uniyearptr))
  {
    alert("false uni year")
     

  }
  if(!uniper.match(uniperptr))
  {
    alert("false uni per")
     

  }

}
for(i=1;i<=rows_count1.length;i++)
{
  var str="to"+i;
  var str1="from"+i;
  var str2="companyName"+i
  var str3="designation"+i
  var todate=document.getElementById(str).value;
  var fromdate=document.getElementById(str1).value;
  var compname=document.getElementById(str2).value;
  var desname=document.getElementById(str3).value;
  

  if(!compname.match(desptr) ||  compname=="")
  {
    alert("company false")
     

  }
  if(!desname.match(desptr) ||  desname=="")
  {
    alert("des false")
     

  }
  if( todate!="")
  {
    todate =new Date(todate);
  
    if(!todate.match(dateptr) )
    {
      alert("to date false")
       

    }
  }
  else
  {
    alert("to date false")
     

  }

  if( fromdate!="")
  {
    fromdate =new Date(fromdate);
  
    if(!fromdate.match(dateptr) )
    {
      alert("from date false")
       

    }
  }
  else
  {
    alert("from date false")
     

  }
}

for(i=1;i<=rows_count2.length;i++)
{
  var str="refName"+i;
  var str1="refContact"+i;
  var str2="refRelation"+i;
  var name =document.getElementById(str).value;
  var refcontact =document.getElementById(str1).value;
  var relation =document.getElementById(str2).value;
  
  if(!name.match(nameptr) || name=="")
  {
    alert("ref name false")
     

  }
  
  if(!refcontact.match(contact) || refcontact=="")
  {
    alert("false ref contect")
     

  }
  if(!relation.match(desptr)|| relation=="")
  {
    alert("false ref relation")
     

  }

}

if(!notice_Period.match(noticeptr) || notice_Period=="")
{
  alert("false notice period") 
   

}
if(!current_CTC.match(ctc) || current_CTC=="")
{
  alert("false current ctc")
   

}

if(!expected_CTC.match(ctc) || expected_CTC=="")
{
  alert("false expected ctc")
   

}
for(i=1;i<=rows_count3.length;i++)
{
var cnt1=0;
var cnt2=0;
var cnt3=0;
  var str="language"+i;
  var str1="read"+i;
  var str2="write"+i;
  var str3="speak"+i;
  var e =document.getElementById(str);
var optionSelectedText = e.options[e.selectedIndex].value;
  
var read = document.getElementById(str1);  
var write = document.getElementById(str2);  
var speak = document.getElementById(str3);  

  
  
  if(optionSelectedText=="lan_select")
  {
     alert("false lang")
  }
  else
  {

    if (read.checked==false && write.checked==false && speak.checked==false) 
{
alert("false checkbox")
}

   
  }

}

if(!cv.match(cvptr))
{
  alert("false resume")
   

}










}
