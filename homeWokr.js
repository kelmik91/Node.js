let mysql = require('mysql2');

const options = require('./config.js');

const command = process.argv[2];
let params = [];
for (let i = 3; i < process.argv.length; i++) {
	params.push(process.argv[i]);
}
console.log(params.length);

switch (command) {
	case 'list':
		params = [];
		sql(list);
		break;

	case 'add':
		if (params.length == 2) {
			sql(add);	
		} else {
			console.log('Errors params');
		}
		break;

	case 'change':
		if (params.length == 3) {
			sql(change);
		} else {
			console.log('Errors params');
		}
		break;

	case 'delete':
		if (params.length == 1) {
			sql(delete_sql);
		} else {
			console.log('Errors params');
		}
		break;

	default:
		console.log('Enter error!!!');
		break;
}

function sql(param) {
	const connection = mysql.createPool(options);

	connection.getConnection(function (err, conn) {
		conn.execute(
			param(), params,
			function (err, results) {
				if (err) {
					console.log(err);
				}
				console.log(results);
			});

		connection.releaseConnection(conn);
		connection.end();
	});
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
