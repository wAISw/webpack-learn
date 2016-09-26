'use strict';

export default function (message) {
    if (NODE_ENV == 'development') {
        debugger;
    }
    alert(`Welcome ${message}`);
};