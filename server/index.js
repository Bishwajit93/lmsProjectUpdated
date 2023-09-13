import dotenv from 'dotenv'
import express from 'express'
import pool from './config/db.js'
import userRoutes from './routes/userRoutes.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 4000


app.use(express.json()); // for parsing application/json

// Verify database connection
// pool.connect((err, client, release) => {
//     if (err) {
//       return console.error('Error acquiring client', err.stack);
//     }
//     client.query('SELECT NOW()', (err, result) => {
//       release();
//       if (err) {
//         return console.error('Error executing query', err.stack);
//       }
//       console.log('Connected to database:', result.rows);
//     });
//   });

app.use('/api/users', userRoutes);

app.get('/',(req, res) => {
    res.send('Hello World')
})


app.listen(port, () => {
    console.log(`The app os listening to the http://localhost:${port}`)
})