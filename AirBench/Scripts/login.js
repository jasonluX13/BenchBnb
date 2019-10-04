let toggleButton = function () {
   
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submitButton = document.querySelector('#submit');

    if (email.value === '' || password.value === '') {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
    }
};

document.querySelector('#submit').disabled = true;
const form = document.getElementById('login-form');
form.addEventListener('keyup', toggleButton);



