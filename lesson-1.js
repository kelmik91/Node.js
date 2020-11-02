const msg = 'Hello World!';
console.log(msg);

var ansi = require('ansi')
  , cursor = ansi(process.stdout);
 
// You can chain your calls forever:
cursor
  .red()                 // Set font color to red
  .write('Hello World!') // Write 'Hello World!' to stdout
  .write('\n');           // And a final \n to wrap things up
 
// Clean up after yourself!
cursor.reset();

var faker = require('faker');
faker.locale = "ru";
 
cursor.blue();
    var randomName = faker.name.findName();
    var randomEmail = faker.internet.email();
    
console.log(randomName);
console.log(randomEmail);

cursor.reset();