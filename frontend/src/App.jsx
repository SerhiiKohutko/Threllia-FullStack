import './App.css'
import {Header} from "./components/Header/Header.jsx";
import {Footer} from "@/components/Footer/Footer.jsx";
import {HomePage} from "@/components/HomePage/HomePage.jsx";


function App() {


  return (
    <>
        <Header/>
            <HomePage/>
        <Footer/>
    </>
  )
}

export default App
