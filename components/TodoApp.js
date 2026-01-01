import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Switch, StatusBar, ImageBackground, Image} from 'react-native';
import DraggableFlatList from "react-native-draggable-flatlist";
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useTheme } from '../context/ThemeContext'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons} from '@expo/vector-icons'
const TodoApp = () => {
const {isDark, toggleTheme} = useTheme();
const [newTodo, setNewTodo] = useState('')
const [toShow, setToShow] = useState("")
const [completeTodos, setCompleteTodos] = useState([])
const [activeTodos, setActiveTodos] = useState([])
const [todos, setTodos] = useState([])


const todosData = useQuery(api.todos.getTodos) || []
const addTodo = useMutation(api.todos.addTodo);
const deleteTodo = useMutation(api.todos.deleteTodo)
const toggleTodo = useMutation(api.todos.toggleTodo)
const deleteCompleted = useMutation(api.todos.deleteCompleted)

const background = isDark ? "#000" : "#fff"

const incompleteTodos = () => {
    setToShow("active")
        const data = todos?.filter((item) => item.isCompleted === false)
        setActiveTodos(data)
    console.log("no active todos")
}

const completedTodos = () => {
    setToShow("completed")
    
        const data = todos?.filter((item) => item.isCompleted === true)
        setCompleteTodos(data)
   console.log("no completed todos")
}


const handleAddTodo = async () => {
    if(newTodo.trim()){
        await addTodo({text: newTodo.trim()})
        console.log("added:", newTodo)
        setNewTodo('')
    }
    console.log("all todos:", todos)
}

useEffect(() => {
    setTodos(todosData)
}, [todosData])


const renderTodoItems = ({item, drag, isActive}) => {
    return (
    <TouchableOpacity onLongPress={drag}  disabled={isActive} className={`flex-row w-full items-center min-h-[64px] justify-between ${isDark ? "border-b-[1px] border-[#393A4B]" : "border-b-2 border-[#E3E4F1]"}`}>
        {console.log(item)}
        <View className={`flex-row flex-1 ml-6 justify-start items-center gap-4`} >
            <TouchableOpacity onPress={()=> toggleTodo({id: item._id})}>
                <View className={`w-6 h-6 rounded-full flex justify-center items-center`}>
                    {item.isCompleted ? <LinearGradient colors={['#55DDFF', '#C058F3']} start={{x:0, y:0}} end={{x:0, y:0}} className="flex-1 w-full h-full rounded-full items-center justify-center">
                        <Image source={require("../assets/images/Path.png")}/>
                    </LinearGradient> : <View className={`border-[1px] h-6 w-6 rounded-full ${isDark ? "border-[#393A4B]" : "border-[#E3E4F1]" }`}></View>}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onLongPress={drag}  disabled={isActive} >
                <Text className={`tracking-tight ${item.isCompleted ?
                    `line-through ${isDark ? "text-[#4D5067]" : "text-[#D1D2DA]"}`
                    : `${isDark ? "text-[#C8CBE7]" : "text-[#494C6B]"}`}
                    `}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        </View>

         <TouchableOpacity className="flex w-6 h-6 mr-6 justify-center" onPress={() => deleteTodo({id: item._id})}>
            <Image  source={ require("../assets/images/close.svg")} className={`${isDark ? "text-[#5B5E7E]" : "text-[#494C6B]"}`} />
         </TouchableOpacity>
    </TouchableOpacity>
    )
}
  return (
    <View className={`flex-1 w-[100%] max-w-[1440px] items-center relative min-h-[100vh] overflow-y-scroll`}>
          <ImageBackground source={ isDark ? require('../assets/images/Bitmap.png') : require('../assets/images/Bitmap.jpg') } resizeMode='cover'
          className="w-[100%] h-[300px] justify-center items-center" >
             <View className="w-[540px] flex-row  justify-between h-[48px] absolute top-[50px]">
                 <Text className="h-full text-[40px]  -mt-3 font-medium text-white">ToDO</Text>
                 <TouchableOpacity className="w-4 h-4 flex items-center self-center" onPress={toggleTheme}>
                    {
                        isDark ? <Image source={require('../assets/images/sun.png')} className='-mt-1'/> : <Ionicons name='moon-outline' size={24} fill="white" color="white"/>
                    }
                   
                 </TouchableOpacity>
             </View>

             {/* input to type new to do */}
             <View className="w-[540px]  h-[64px] relative gap-6 flex-row items-center">
                 <View  className={`absolute left-6 border-[1px] h-6 w-6 rounded-full ${isDark ? "border-[#393A4B]" : "border-[#E3E4F1]" }`}></View>
                 <TextInput className={`h-full w-full px-16  rounded-md ${isDark ? "bg-[#25273D] text-[#C8CBE7]" : "bg-[#FFFFFF] text-[#494C6B]" }`} placeholder='Add a todo' value={newTodo} onChangeText={setNewTodo}
                  onSubmitEditing={handleAddTodo}  returnKeyType="done"  blurOnSubmit={true}/>
             </View>
        </ImageBackground>

        <View className={`flex-1 w-full ${isDark ? "bg-black": "bg-white"}`}>
             <View className={`w-[540px] h-[439px] -mt-10 rounded-md shadow-lg mx-auto  overflow-y-scroll relative ${isDark ? "bg-[#25273D]" : "bg-[#FFFFFF]" }`}>
                {toShow === "completed" ? (
                     <DraggableFlatList scrollEnabled={true} data={completeTodos} renderItem={renderTodoItems} keyExtractor={(item) => item._id} className='flex-1 overflow-y-scroll'/>
                ) : toShow === "active" ? 
                (
                    <DraggableFlatList scrollEnabled={true} onDragEnd={({ data }) => setActiveTodos(data)} data={activeTodos} renderItem={renderTodoItems} keyExtractor={(item) => item._id} className='flex-1 overflow-scroll'/>
                ) : (
                    <DraggableFlatList scrollEnabled={true} data={todos}  onDragEnd={({ data }) => setTodos(data)} renderItem={renderTodoItems} keyExtractor={(item) => item._id} className='flex-1 overflow-y-scroll'/>
                )}
               
                <View className={`h-[62px] border-t-[0.5px] items-center flex-row justify-around bottom-0 ${isDark ? "border-[#393A4B]  text-[#C8CBE7]" : "border-[#E3E4F1] text-[#494C6B]"}`}>
                    <Text  className={`text-sm ${isDark ? " text-[#C8CBE7]" : " text-[#494C6B]"}`}>{activeTodos.length} items left</Text>
                    <View className='flex-row justify-between gap-4'>
                        <Text onPress={() => setToShow("all")}  className={`text-sm ${isDark ? " text-[#C8CBE7]" : " text-[#494C6B]"}`}>All</Text>
                        <Text  onPress={incompleteTodos}  className={`text-sm ${isDark ? " text-[#C8CBE7]" : " text-[#494C6B]"}`}>Active</Text>
                        <Text  onPress={completedTodos} className={`text-sm ${isDark ? " text-[#C8CBE7]" : " text-[#494C6B]"}`}>Completed</Text>
                    </View>
                    <Text onPress={() => deleteCompleted()} className={` text-sm ${isDark ? " text-[#C8CBE7]" : " text-[#494C6B]"}`}>Clear Completed</Text>
                </View>
             </View>

             <Text className={`pt-6 mx-auto text-center text-sm ${isDark ? " text-[#C8CBE7]" : " text-[#494C6B]"}`}>Drag and drop to reorder list</Text>
        </View>

        
    </View> 
  )
}

export default TodoApp