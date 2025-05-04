const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    const { title, description, completed, dueDate, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTodo = new Todo({ title, description, completed, dueDate, priority });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating todo' });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while getting todos' });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching todo' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, description, completed, dueDate, priority } = req.body;

    const updatedData = { updatedAt: Date.now() };
    if (title !== undefined) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (completed !== undefined) updatedData.completed = completed;
    if (dueDate !== undefined) updatedData.dueDate = dueDate;
    if (priority !== undefined) updatedData.priority = priority;

    const todo = await Todo.findByIdAndUpdate(req.params.id, { $set: updatedData }, { new: true });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting todo' });
  }
};
