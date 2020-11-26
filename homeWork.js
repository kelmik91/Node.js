const mysql = require('mysql2');
const express = require('express');
const app = express();

const options = require('./config.js');

const command = process.argv[2];

let params = [];

const api = 'api/v1/sql';

app.get(api + '/list/', (req, res) => {
	res.send(sql('list'));
});

app.post(api + '/add/', (req, res) => {
    let params = req.params;
	res.send(sql('add'));
});

app.post(api + '/change/:id', (req, res) => {
    let params = req.params;
    params[2] = req.params.id;
	res.send(sql('change'));
});

app.post(api + '/delete/:id', (req, res) => {
    let params = req.params.id;
	res.send(sql('delete'));
});

function sql(param) {
    let result;
	const connection = mysql.createPool(options);

	connection.getConnection(function (err, conn) {
		conn.execute(
			param(), params,
			function (err, results) {
				if (err) {
					console.log(err);
				}
                console.log(results);
                result = results;
			});

		connection.releaseConnection(conn);
		connection.end();
    });
    return result;
}

function list() {
	return 'SELECT * FROM `item`';
}

function add() {
	return 'INSERT INTO `item`(`name`, `number`) VALUES ( ?, ?)';
}

function change() {
	return 'UPDATE `item` SET `name`= ?,`number`= ? WHERE id = ?';
}

function delete_sql() {
	return 'DELETE FROM `item` WHERE id = ?';
}


app.listen(3000, () => console.log('Listening on port 3000'));