const express = require('express')
const app = express()
const PORT = 5000
const todoListRouter = require('./router/todoListRouter')
const todoRouter = require('./router/todoRouter')

app.use( express.json() )

app.use(todoListRouter)
app.use(todoRouter)

app.use((req, res, next) => {
  console.log(`Handling request for ${req.method} ${req.path}`)
  next()
})

app.use((req, res, next) => {
  if(req.method == 'POST' && req.headers['content-type'] != 'application/json'){
    return res.status(400).json({error: 'Missing header Content-Type: application/json'})
  }
  next()
})


// db.serialize(() => {
//   db.run("DROP TABLE IF EXISTS todo_lists")
//   db.run("DROP TABLE IF EXISTS todos")
//   db.run(`CREATE TABLE "todo_lists" ("id"	INTEGER,"title"	TEXT NOT NULL,"color"	TEXT NOT NULL DEFAULT 'white',PRIMARY KEY("id" AUTOINCREMENT));`)
//   db.run(`CREATE TABLE "todos" ("id"	INTEGER,"content"	TEXT NOT NULL DEFAULT '',"done" INTEGER NOT NULL DEFAULT 0,"todo_list_id"	INTEGER,PRIMARY KEY("id" AUTOINCREMENT),FOREIGN KEY("todo_list_id") REFERENCES "todo_lists"("id"));`)
//   db.get("PRAGMA foreign_keys = ON") // Enable SQL error on foreign key constraints
  app.listen(PORT, () => console.log("Running on port " + PORT))
// })