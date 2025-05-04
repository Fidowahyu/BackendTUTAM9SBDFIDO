const express = require('express');
const router = express.Router();
const {
  createTodo,
  updateTodo,
  getAllTodos,
  getTodoById,
  deleteTodo
} = require('../controllers/todoController');


router.get('/', getAllTodos);         
router.get('/:id', getTodoById);      
router.post('/', createTodo);         
router.put('/:id', updateTodo);       
router.delete('/:id', deleteTodo);    

module.exports = router; 
