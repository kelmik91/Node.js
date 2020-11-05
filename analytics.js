const fs = require('fs');
let data_arr;
if (fs.existsSync(process.argv[2])) {
    let date = fs.readFileSync('save.txt','utf8');
    data_arr = date.split(';');
} else {
    console.log('Файл' + process.argv[2] + ' не найдне');
}

console.log('Всего партий сыграно: ' + (data_arr.length - 1));

let win = 0;
let draw = 0;
let lost = 0;

for (let i = 0; i < data_arr.length-1; i++) {
    let arr = data_arr[i].split(','); 

    if (arr[0] === arr[1]) {
        draw++;
    } else if (arr[0] > arr[1]) {
        win++;
    } else {
        lost++;
    }
}

const result = 'Побед: ' + win + ', ничья: '+ draw + ', поражений: ' + lost;

console.log(result);