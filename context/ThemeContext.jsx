import React, { useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext()
const ThemeProvider = ({children}) => {
  const systemColorScheme = useColorScheme()
  const [isDark, setIsDark ] = useState(systemColorScheme === "dark")

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async() => {
    try {
      const savedTheme = AsyncStorage.getItem("theme")
      if(savedTheme !== null){
        setIsDark(savedTheme === "dark")
      }
    }catch(error){
      console.log("error loading theme:", error)
    }
  }

  const toggleTheme = async() => {

    const newTheme = !isDark
    setIsDark(newTheme)
    try{
       await AsyncStorage.setItem("theme", newTheme ? 'dark' : 'light')
    }catch(error){
      console.log("error saving theme:", error)
    }
  }


  return (
    <ThemeContext.Provider value={{isDark, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export  const useTheme = () => useContext(ThemeContext)