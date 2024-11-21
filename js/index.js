var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var signinErrorMessage = document.getElementById('signinErrorMessage');
var signInAlert = document.querySelector('.alert-success')

var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signupErrorMessage = document.getElementById('signupErrorMessage');


var signInBtn = document.getElementById('signInBtn');
var signUpBtn = document.getElementById('signUpBtn');
var logoutBtn = document.getElementById('logoutBtn');


var username = document.getElementById('username');

var usersString = localStorage.getItem('users')
var usersArray;


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
    return password.length >= 8;
}

if (signUpBtn) {
    signUpBtn.addEventListener('click',function () {
        if (signupName.value.trim() != '' && signupEmail.value.trim() != '' && signupPassword.value.trim() != '' ) {
            signupErrorMessage.classList.add('d-none');
            if (validateEmail(signupEmail.value)) {
                if (!validatePassword(signupPassword.value)) {
                signupErrorMessage.innerHTML ='password must be at least 8 characters';
                signupErrorMessage.classList.remove('d-none');
                }else{
                    

                    if (usersString) {
                        usersArray = JSON.parse(usersString);
                    }else{
                        usersArray = []
                    }

                    var user ={
                        name: signupName.value,
                        email: signupEmail.value,
                        password: signupPassword.value
                    };

                    var emailFound =false;
                    for (let i = 0; i < usersArray.length; i++) {
                        if (usersArray[i].email == signupEmail.value) {
                            emailFound =true;
                            break;
                        }
                        
                    }
                    if (emailFound) {
                        signupErrorMessage.innerHTML ='email is used already';
                        signupErrorMessage.classList.remove('d-none');
                    }else{
                        usersArray.push(user);
                        localStorage.setItem('users',JSON.stringify(usersArray));
                        window.location.href = 'index.html?signup=true'
                    }


                }
            }else{
                signupErrorMessage.innerHTML ='Email is not valid';
                signupErrorMessage.classList.remove('d-none');
            }
        }else{
            signupErrorMessage.innerHTML ='all fields are required';
            signupErrorMessage.classList.remove('d-none');
        }
    });
    
}

if (signInBtn) {
    if(localStorage.getItem('isLoggedIn')){
        window.location.href = 'welcome.html';
        
    }
    signInBtn.addEventListener('click',function () {
        if (signinEmail.value.trim() != '' && signinPassword.value.trim() != '' ){
            if (validateEmail(signinEmail.value.trim())) {
                if (usersString) {
                    usersArray = JSON.parse(usersString);

                    var canLogin =false;
                    for (let i = 0; i < usersArray.length; i++) {
                        if (usersArray[i].email == signinEmail.value && usersArray[i].password == signinPassword.value) {
                            canLogin =true;
                            localStorage.setItem('username',usersArray[i].name);
                            localStorage.setItem('isLoggedIn',true);
                            break;
                        }
                        
                    }
                    if (canLogin) {
                        window.location.href = 'welcome.html'
                    }else{
                        signinErrorMessage.innerHTML ='wronge email or password';
                        signinErrorMessage.classList.remove('d-none');
                    }

                }else{
                    signinErrorMessage.innerHTML ='wronge email or password';
                    signinErrorMessage.classList.remove('d-none');
                }


            }else{
                signinErrorMessage.innerHTML ='invalid Email';
                signinErrorMessage.classList.remove('d-none');
            }
        }else{
            signinErrorMessage.innerHTML ='all fields are required';
            signinErrorMessage.classList.remove('d-none');
        }
    })
    
}

if (logoutBtn) {
    username.innerHTML ='welcome ' + localStorage.getItem('username')
    logoutBtn.addEventListener('click',function () {
        localStorage.removeItem('username')
        localStorage.removeItem('isLoggedIn')
        window.location.href = 'index.html'
        
    })
}

if (signInAlert) {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('signup');

if (success) {
    signInAlert.classList.remove('d-none');
}else{
    signInAlert.classList.add('d-none');
}
}

