"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var app = (0, express_1["default"])();
var env_config = dotenv_1["default"].config();
var port = process.env.PORT || 3002;
app.use((0, express_1.json)());
app.listen(port, function () {
    console.log("Listening to port ".concat(port));
});
