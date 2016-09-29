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

let handler;
try {
    handler = require('bundle!./routes/' + moduleName);
} catch (e) {
    alert(e);
}

if (handler) {
    handler(function (route) {
        route();
    });
}


// moment
let moment = require('moment');

let today = moment(new Date()).locale('ru');



let users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Luke'},
    {id: 3, name: 'Ivan'},
];
console.log(pluck(users, 'name'));



