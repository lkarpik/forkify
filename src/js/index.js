// Global app controller
import logs from './test';
// const logs = require('./test');
const ss = 55;
const array1 = [1, 2, 3, 4, 5];
console.log(`Imported ${logs.cons()} form test and good and const ${ss}`);
array1.forEach(element => {
    console.log(element);
});