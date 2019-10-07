

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function toggleButton() {
    const description = document.querySelector('#description');
    const numseats = document.querySelector('#num-seats');
    const lat = document.querySelector('#lat');
    const lon = document.querySelector('#lon');
    const submitButton = document.querySelector('#submit');

    if (description.value === '' || numseats.value === '' || lat.value === '' || lon.value === '') {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;
    }
}

document.getElementById("lat").value = getCookie("lat");
document.getElementById("lon").value = getCookie("lon");

document.getElementById("submit").disabled = true;
document.getElementById("form").addEventListener('keyup', toggleButton);
