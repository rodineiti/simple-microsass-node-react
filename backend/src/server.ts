import app from './app';
import database from './database';

database.sync();
console.log('Database sqlite');

app.listen(9001);
console.log('Server running in port 9001');