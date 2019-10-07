let toggleButton = function () {
    const submitButton = document.getElementById('submit');
    const rating = document.getElementById('rating');
    const feedback = document.getElementById('feedback');

    if (rating.value === '' || feedback.value === '') {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
    }
}

document.getElementById('submit').disabled = true;
document.getElementById('form').addEventListener('keyup', toggleButton);