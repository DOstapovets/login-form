var app = {

    isAuth: function() {
        return (localStorage.getItem("login")) ? true : false;
    },
    greeting: function() {
        var el = document.createElement('div');
        el.className = 'greeting';
        setTimeout(function() {
            el.parentNode.removeChild(el);
        }, 1000);

    },
    initForm: function() {

    },
    init: function() {
        if (app.isAuth()) {
            app.greeting();
        }
    }
};