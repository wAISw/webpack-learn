'use strict';

document.getElementById('loginButton').onclick = function () {
    require.ensure(['./login'], function (require) {
        let login = require('./login');

        login();
    }, 'auth');
};

document.getElementById('logoutButton').onclick = function () {
    require.ensure([], function (require) { // можно ничего не указывать в []
        let logout = require('./logout');

        logout();
    }, 'auth');
};


let moduleName = location.pathname.slice(1);

let context = require.context('./routes', false, /\.js$/);

context.keys().forEach(function (path) {
    let module = context(path);
    module();
});
