"use strict";

var dateStr = "2023-04-11";
var dateArr = dateStr.split("-");
var dateObj = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
console.log(dateObj);