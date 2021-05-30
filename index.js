const express = require('express'),
mysql = require('mysql'),
cors = require('cors'),
app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended: true
  }));

db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbtodo'
})

var server = {
    port : 3030
}

app.get('/', (req,res) => {
    res.send(`
    <html>
        <body>
            <form action="/todo" method="post">
            <input name="deskripsi" />
            <button> Add </button>
            </form>
        </body>
    </html>`)
})

app.get('/todo', (req,res) => {
    let sql = `SELECT * FROM todo`
    db.query(sql, (err,data) => {
        if (err) throw err
        res.send(data);
    })
})

app.post('/todo', (req, res) => {
     let sql = `INSERT INTO todo(deskripsi) VALUES (?)`
     let values = [
         req.body.deskripsi
     ]
     db.query(sql, [values], function(err) {
        if (err) throw err;
        res.send(res.insertId)
      })
})

app.delete('/todo/:id', function(req,res){
    console.log(req.params.id)
    let sql = `DELETE FROM todo WHERE id=(?)`
    let values = [
        req.params.id
    ]
    db.query(sql, [values], function (err) {
        if(err) throw err;
        res.end()
    })
})

app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`))