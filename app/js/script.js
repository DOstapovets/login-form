function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
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



function isValid() {
    var form = document.forms["log-in"];
    let login = form['login'];
    let pass = form['pass'];
    login.value = login.value.trim();
    pass.value = pass.value.trim();
    if (!login.value.length) {
        login.closest("label").classList.add('form--error-text');
        login.classList.add('form__inpt--error');
    } else {
        if (/[^\w\d\-! ]/i.test(form['login'].value)) {
            login.closest("label").classList.add('form--error-text');
            login.classList.add('form__inpt--error');
        } else {
            login.closest("label").classList.remove('form--error-text');
            login.classList.remove('form__inpt--error');
            setCookie("login", form['login'].value, 2);
        }
    }
    if (!pass.value.length) {
        pass.closest("label").classList.add('form--error-text');
        pass.classList.add('form__inpt--error');
    }

}

function checkCookie() {
    var login = getCookie("login");
    if (login.length) {
        var el = document.createElement('div');
        el.className = "greeting";
        el.innerText = `Hello ${login}!`
        document.body.appendChild(el);
    }
    setTimeout(function() {
        document.body.removeChild(el);
    }, 1000);
}
window.onload = function() {
    checkCookie();
};