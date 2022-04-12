function create (req, res) {
    const {todoListID, content} = req.body
    if(!(todoListID || content)){
      return res.status(400).json({error: 'Invalid body'})
    }
    db.run(`INSERT INTO todos(content, todo_list_id) VALUES (?,?)`, [content, todoListID], function(error){
      if(error){
        return res.status(500).json({error})
      }
      db.get(`SELECT * FROM todos WHERE id = ?`, [this.lastID], function(err, row){
        res.json({message: 'Success', data:row})
      })
    })
  }

function allFromList (req, res) {
    const {todoListID} = req.body
    switch(req.query.done){
      case 'true':
      case 'false':
        const done = req.query.done == 'true' ? 1 : 0
        db.all(`SELECT * FROM todos WHERE todo_list_id = ? AND done = ?`, [todoListID, done], function(error, rows){
          if(error){
            res.status(500).json({error})
          }
          res.json({message: 'Success', data: rows})
        })
        break;
      default:
        db.all(`SELECT * FROM todos WHERE todo_list_id = ?`, [todoListID], function(error, rows){
          if(error){
            res.status(500).json({error})
          }
          res.json({message: 'Success', data: rows})
        })
    }
  }

function get (req, res) {
    const {id} = req.body
    if(!id){ 
      return res.status(400).json({error: 'Invalid body'})
    }
    db.get(`SELECT * FROM todos WHERE id = ?`, [id], function(error, row){
      if(error){
        res.status(500).json({error})
      }
      res.json({message: 'Success', data: row})
    })
  }

function update (req, res) {
    const {id, content} = req.body
    const done = req.body.done == 'true' ? 1 : 0
    if(!(id || content || done)){ 
      return res.status(400).json({error: "Invalid body"})
    }
    db.run(`UPDATE todos SET content = ?, done = ? WHERE id = ?`, 
      [content,done,id],
      function(error){
        if(error){
          return res.status(500).json({error})
        }
        res.json({message: 'Todo updated'})
      }
    )
  }
  
  module.exports = { create, get, allFromList, update}