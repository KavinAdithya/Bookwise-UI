import Register from './General/Register';
import Login from './General/Login'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./General/Layout";
import AuthProvider from "./General/AuthProvider";
import NotFound from "./General/NotFound"
import UnAuthorized from './General/UnAuthorized'
import Welcome from './Welcome'
import AuthorizationRoute from './General/AuthorizationRoute';
import UserHome from './Users/UserHome';

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
                            path="/register" 
                            element={<Register/>}/>
                        <Route
                            path='/home'
                            element={
                            <AuthorizationRoute
                                    allowedRoles={["USER"]}>
                                <UserHome/>
                            </AuthorizationRoute>
                            }/>
                        <Route
                            path='/'
                            element={
                                <Welcome/>
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