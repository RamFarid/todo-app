import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeContextProvider from './contexts/ThemeContext.jsx'
import UserContextProvider from './contexts/UserContext.jsx'
import TodosContextProvider from './contexts/TodosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <UserContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </UserContextProvider>
  </ThemeContextProvider>
)
