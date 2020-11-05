const { randomInt } = require('crypto');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
});
console.log('Начало Игры!');
console.log('1 - Орел, 2 - Решка, q - Выход');

let count_win = 0;
let count_lost = 0;

rl.on('line', function (cmd) {

    if (+cmd !== 1 && +cmd !== 2 && cmd !== 'q') {
        console.log('Не правильный ввод!');
        console.log('1 - Орел, 2 - Решка, q - Выход');
    } else {

    let number_rand = randomInt(1, 3);
    
    console.log('Вы ввели: ' + cmd);

    if (cmd === 'q') {
        let data_game = count_win + ',' + count_lost + ';';
        fs.openSync(process.argv[2], 'a');
        fs.appendFileSync(process.argv[2], data_game, 'utf8');
        rl.close();
    }
    else if (number_rand === +cmd) {
        count_win++
        console.log('You Win!');
    }
    else {
        count_lost++
        console.log('You Lost!');
    }

    console.log('В текущей ссесии - Побед: ' + count_win + ', Поражений: ' + count_lost);
    console.log('----------------------');
    }
});
