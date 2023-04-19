import './App.css';
import SignIn from "./Components/SignIn";
import {Router, Routes, Route} from "react-router-dom";
import {Dashboard} from "./Components/Dashboard";


// import {Routes,Route} from 'react-router'

function App() {
    return (
        // <Router>
        //     <Routes>
        //         <Route exact path ='/login' element={<SignIn/>}/>
        //     </Routes>
        // </Router>
        <Dashboard/>
    );
}

export default App;
