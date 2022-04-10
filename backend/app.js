const express = require('express');
const app = express();

app.use(express.json());

// import all routes
const products = require('./routes/product');

app.use('/api/v1', products)

module.exports = app

/*  
    Keybindings: https://gist.github.com/espenbjorkeng/484871484d4bf13ce23d8d115e2e8ef5
    Edit shortcuts: CTRL+SHIFT+P > Preferences: Open Keyboard Shortcuts (JSON)
    ALT + I/J/K/L: Move cursor up/left/down/right
    ALT + SHIFT + I/J/K/L: Mark lines/characters while moving character up/left/down/right
    ALT + CTRL + J/L: Move cursor to start/end of word
    SHIFT + CTRL + I/K: Move marked- or current line up/down
    CTRL + J/L: Move cursor to start/end of line
    ALT + SHIFT + O: Mark characters from cursor to end of line
    ALT + SHIFT + U: Mark characters from cursor to start of line
    CTRL + I/K: Add cursor on line above/below the current cursor position
*/