import Footer from "./Footer";
import Header from "./Header";
import Signin from './Signin';
import Login from './Login'
import Welcome from "./Welcome";
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./Layout";
import AuthProvider from "./AuthProvider";

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
                            path="/signin" 
                            element={<Signin/>}/>
                        <Route 
                            path="*" 
                            element={<Welcome/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </>
}

export default BookWiseApp;