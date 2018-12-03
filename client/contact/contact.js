// Getting all input text objects
var username = document.forms["vform"]["username"];
var phone = document.forms["vform"]["phone"];
var email = document.forms["vform"]["email"];
var password = document.forms["vform"]["password"];
var password_confirm = document.forms["vform"]["password_confirm"];

// Getting all error display objects
var username_error = document.getElementById("username_error");
var phone_error = document.getElementById("phone_error");
var email_error = document.getElementById("email_error");
var password_error = document.getElementById("password_error");

// Setting all event listeners
username.addEventListener("blur", usernameVerify, true);
phone.addEventListener("blur", phoneVerify, true);
email.addEventListener("blur", emailVerify, true);
password.addEventListener("blur", passwordVerify, true);

// Validation function
function Validate(){
    // username validation
    if(username.value == ""){
        username.style.border = "1px solid red";
        username_error.textContent = "Username is required";
        username.focus();
        return false;
    }
    // phone validation
    if(phone.value == ""){
        phone.style.border = "1px solid red";
        phone_error.textContent = "Phone number is required";
        phone.focus();
        return false;
    }
    if(isNaN(parseFloat(phone.value))){
        phone.style.border = "1px solid red";
        phone_error.textContent = "Invalid phone number";
        phone.focus();
        return false;
    }
    // email validation
    if(email.value == ""){
        email.style.border = "1px solid red";
        email_error.textContent = "Email is required";
        email.focus();
        return false;
    }
    // password validation
    if(password.value == ""){
        password.style.border = "1px solid red";
        password_error.textContent = "Password is required";
        password.focus();
        return false;
    }
    // check if the two passwords match
    if (password.value != password_confirm.value){
        password.style.border = "1px solid red";
        password_confirm.style.border = "1px solid red";
        password_error.innerHTML = "The two passwords don't match";
        return false;
    }
}

// Event handler functions
function usernameVerify(){
    if (username.value != "") {
        username.style.border = "1px solid grey";
        document.getElementById('username_div').style.color = "grey";
        username_error.innerHTML = "";
        return true;
    }
}

function phoneVerify(){
    if (phone.value != "") {
        phone.style.border = "1px solid grey";
        document.getElementById('phone_div').style.color = "grey";
        phone_error.innerHTML = "";
        return true;
    }
}

function emailVerify(){
    if (email.value != "") {
        email.style.border = "1px solid grey";
        document.getElementById('email_div').style.color = "grey";
        email_error.innerHTML = "";
        return true;
    }
}

function passwordVerify(){
    if (password.value != "") {
        password.style.border = "1px solid grey";
        document.getElementById('password_div').style.color = "grey";
        document.getElementById('password_confirm_div').style.color = "grey";
        password_error.innerHTML = "";
        return true;
    }
    if (password.value === password_confirm.value) {
        password.style.border = "1px solid grey";
        document.getElementById('pass_confirm_div').style.color = "grey";
        password_error.innerHTML = "";
        return true;
    }
}