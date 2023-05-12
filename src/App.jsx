import { BrowserRouter,useParams } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './Components/Theme/theme'
import './App.css'
import AnimatedRoutes from './Routes/AnimatedRoutes'

function App() {
  // const {id} = useParams()
  return (
    <BrowserRouter>
      <ThemeProvider
        theme={theme}
      >
        <AnimatedRoutes/>
      </ThemeProvider>
    </BrowserRouter>
    // <div className="App">
    //   <Pokemon/>
    // </div>
  )
}

export default App
