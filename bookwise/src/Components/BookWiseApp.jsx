import Signin from './General/Signin';
import Login from './General/Login'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./General/Layout";
import AuthProvider from "./General/AuthProvider";
import Logout from "./General/Logout";
import NotFound from "./General/NotFound"
import UnAuthorized from './General/UnAuthorized'
import Welcome from './Users/Welcome'
import AuthorizationRoute from './General/AuthorizationRoute';

function BookWiseApp() {
    return <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route 
                            path="/login" 
                            element={<Login/>}/>
                        <Route 
                            path="/logout" 
                            element={<Logout/>}/>
                        <Route 
                            path="/signin" 
                            element={<Signin/>}/>
                        <Route
                            path='/welcome'
                            element={
                            <AuthorizationRoute
                                    allowedRoles={["USER"]}>
                                <Welcome/>
                            </AuthorizationRoute>
                            }/>
                        <Route 
                            path="/unauthorized" 
                            element={<UnAuthorized/>}/>
                        <Route 
                            path="*" 
                            element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
}

export default BookWiseApp;