const todoList = require('../models/todos_list')

async function get (req, res) {
const todoList = await todoList.findByPK(req.params.id)
if(todoList){
    res.json(todoList)
} else {
    res.status(404).json({message: 'no bueno'})
}
}

function create (req, res) {
    const {title, color} = req.body
    if(!(title || color)){
      return res.status(400).json({error: "Invalid body"})
    }
    db.run(`INSERT INTO todo_lists(title,color) VALUES (?, ?)`, [title,color], function(error){
        if(error){
          return res.status(500).json({error})
        }

          db.get(`SELECT * FROM todo_lists WHERE id = ?`, [this.lastID], function(err, row){
            res.json({message:"Success", data:row})
          })
        })
      }

function all (req, res) {
        db.all(`SELECT * FROM todo_lists`, function(error, rows){
          if(error){
            return res.status(500).json({error})
          }
          res.json({message: 'Success', data: rows})
        })
      }

function update (req, res) {
        const {id, title, color} = req.body
        if(!(id || title || color)){
          return res.status(400).json({error: 'Invalid body'})
        }
        db.run(`UPDATE todos SET title = ?, color = ? WHERE id = ?`, [title,color,id], function(error){
          if(error){
            return res.status(400).json({error})
          }
          res.json({message: 'Todo list updated'})
        })
      }

function remove (req, res) {
        const {id} = req.body
        if(!id){
          return res.status(400).json({error: 'Invalid body, missing id'})
        }
        db.run(`DELETE FROM todo_lists WHERE id = ?`, [id], function(error){
          if(error){
            return res.status(500).json({error})
          }
          if(this.changes == 0){
            return res.status(404).json({error: `Todo list with id ${id} not found`})
          }
      
          res.json({message: 'Todo list deleted'})
        })
      }

      module.exports = { create, get, all, update, remove}
