import Register from './General/Auth/Register';
import Login from './General/Auth/Login'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./General/Templates/Layout";
import AuthProvider from "./General/Auth/AuthProvider";
import NotFound from "./General/NotFound"
import UnAuthorized from './General/UnAuthorized'
import Welcome from './Welcome'
import AuthorizationRoute from './General/Auth/AuthorizationRoute';
import UserHome from './Users/UserHome';
import BookRegistration from './Author/BookRegistration';
import AuthorHome from './Author/AuthorHome';
import AdminHome from './Admin/AdminHome';
import Authors from './Admin/Authors';
import AuthorDetailView from './Admin/AuthorDetailView';
import AuthorBooks from './Author/AuthorBooks';
import AuthorBookDetail from './Author/AuthorBookDetail';
import Users from './Admin/Users';
import UserDetail from './Admin/UserDetail';
import AdminBooks from './Admin/AdminBooks';
import AdminBookDetail from './Admin/AdminBookDetail';
import UserBooks from './Users/UserBooks';
import UserBookDetail from './Users/UserBookDetail';

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

                         <Route
                            path='/books'
                            element={
                            <AuthorizationRoute
                                    allowedRoles={["USER"]}>
                                <UserBooks/>
                            </AuthorizationRoute>
                            }/>
                        <Route
                            path='/books/:bookId'
                            element={
                            <AuthorizationRoute
                                    allowedRoles={["USER"]}>
                                <UserBookDetail/>
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
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["AUTHOR"]}>
                                        <BookRegistration/>
                                    </AuthorizationRoute>
                                }/>
                        <Route
                            path='/author/books'
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["AUTHOR"]}>
                                        <AuthorBooks/>
                                </AuthorizationRoute>
                                }/>
                        <Route
                            path='/author/book/:bookId'
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["AUTHOR"]}>
                                        <AuthorBookDetail/>
                                </AuthorizationRoute>
                                }/>

                        {/* Admin Routes */}
                        <Route
                            path='/admin/authors'
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <Authors/>
                                </AuthorizationRoute>
                            }/>
                        <Route 
                            path='/admin/home'
                            element={
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <AdminHome/>
                                </AuthorizationRoute>
                            }/>
                        <Route
                            path='/admin/authors/review/:authorId'
                            element={ 
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <AuthorDetailView/>
                                </AuthorizationRoute>
                            }/>

                        <Route
                            path='/admin/users'
                            element={ 
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <Users/>
                                </AuthorizationRoute>
                            }/>
                        
                        <Route
                            path='/admin/users/:userId'
                            element={ 
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <UserDetail/>
                                </AuthorizationRoute>
                            }/>
                        
                        <Route
                            path='/admin/books'
                            element={ 
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <AdminBooks/>
                                </AuthorizationRoute>
                            }/>
                        
                        <Route
                            path='/admin/books/:bookId'
                            element={ 
                                <AuthorizationRoute
                                    allowedRoles={["ADMIN"]}>
                                    <AdminBookDetail/>
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