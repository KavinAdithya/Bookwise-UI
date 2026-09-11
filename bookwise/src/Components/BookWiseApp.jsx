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
import BookRegistration from './Author/BookRegistration';
import AuthorHome from './Author/AuthorHome';
import AdminHome from './Admin/AdminHome';
import Authors from './Admin/Authors';

function BookWiseApp() {
    return <>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout/>}>
                        {/* Public Routes */}
                        <Route 
                            path="/login" 
                            element={<Login/>}/>
                        <Route 
                            path="/register" 
                            element={<Register/>}/>
                        <Route
                            path='/'
                            element={
                                <Welcome/>
                            }/>
                        {/* User Routes */}
                        <Route
                            path='/home'
                            element={
                            <AuthorizationRoute
                                    allowedRoles={["USER"]}>
                                <UserHome/>
                            </AuthorizationRoute>
                            }/>
                        
                        {/* Author Routes */}
                        <Route
                            path='/author/home'
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["AUTHOR"]}>
                                    <AuthorHome/>
                                </AuthorizationRoute>
                            }/>
                        <Route
                            path='/author/books/register'
                            element={<BookRegistration/>}/>

                        {/* Admin Routes */}
                        <Route
                            path='/admin/home'
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <Authors/>
                                </AuthorizationRoute>
                            }/>
                        <Route 
                            path='/admin/authors'
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <AdminHome/>
                                </AuthorizationRoute>
                            }/>

                        {/* Authorization Routes */}
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