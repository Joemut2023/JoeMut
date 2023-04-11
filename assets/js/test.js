const dateStr = "2023-04-11";
const dateArr = dateStr.split("-");
const dateObj = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
console.log(dateObj);
