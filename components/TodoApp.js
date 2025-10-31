import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeArea, Switch, StatusBar} from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useTheme } from '../context/ThemeContext'

const TodoApp = () => {
const {isDark, toggleTheme} = useTheme();
const [newTodo, setNewTodo] = useState('')

const todos = useQuery(api.todos.getTodos) || []
const addTodo = useMutation(api.todos.addTodo);
const deleteTodo = useMutation(api.todos.deleteTodo)
const toggleTodo = useMutation(api.todos.toggleTodo)

const handleAddTodo = async () => {
    if(newTodo.trim()){
        await addTodo({text: newTodo.trim()})
        setNewTodo('')
    }
}
  return (
    <div>TodoApp</div>
  )
}

export default TodoApp