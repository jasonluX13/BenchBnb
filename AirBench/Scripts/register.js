//let toggleButton = function () {
//    const form = document.querySelector('#register-form');
//    const registerButton = document.querySelector('#register');
//    let i = 0;
//    while ( i < form.elements.length) {
//        console.log(form.elements[i].value);
//        if (form.elements[i].value === "") {
//            registerButton.disabled = true;         
//            break;
//        }
//        i++;
//    }
//    console.log('toggle');
//    if (i == form.elements.length) {
//        registerButton.disabled = false;
//    }
//}

let toggleButton = function () {
    const fname = document.querySelector('#firstname');
    const lname = document.querySelector('#lastname');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submitButton = document.querySelector('#register');

    if (email.value === '' || password.value === '' || fname.value === '' || lname.value === '') {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
    }
};

document.querySelector('#register').disabled = true;
document.querySelector('#register-form').addEventListener('keyup', toggleButton);
