import './App.css';
import SignIn from "./Components/SignIn";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ScreenLayout} from "./Components/Commom/ScreenLayout";
import NotFound from "./Components/Error/NotFound";
import Roles from "./Components/Roles";
import Permissions from "./Components/Permissions";
import Users from "./Components/Users";
import Uploader from "./Components/Commom/Uploader";
import AssignPermission from "./Components/AssignPermission";
import MyProfile from "./Components/MyProfile";
import Home from "./Components/Home";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignIn/>}/>
                    <Route path='*' element={<NotFound/>}/>
                    <Route path='/dashboard' element={<ScreenLayout/>}>
                        <Route path='home' element={<Home/>}/>
                        <Route path='add-permission' element={<>add permission</>}/>
                        <Route path='all-permissions' element={<Permissions/>}/>
                        <Route path='add-role' element={<>add-role</>}/>
                        <Route path='all-roles' element={<Roles/>}/>
                        <Route path='assign-permissions' element={<AssignPermission/>}/>
                        <Route path='add-user' element={<>add-user</>}/>
                        <Route path='all-users' element={<Users/>}/>
                        <Route path='upload-user' element={<Uploader/>}/>
                        <Route path='my-profile' element={<MyProfile/>}/>
                        <Route index element={<>index</>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
