'use strict';

function saveToStorage(key, value) {
    var item = JSON.stringify(value);
    localStorage.setItem(key, item);
}

function loadFromStorage(key) {
    var item = localStorage.getItem(key)
    var value = JSON.parse(item);
    return value;
}

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}