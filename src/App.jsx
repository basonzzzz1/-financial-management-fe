import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import AdminLayout from "layouts/admin";
import Login from "./components/Login";

const App = () => {
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path="admin/*" element={<AdminLayout/>}/>
            <Route path="/" element={<Navigate to="/login" replace/>}/>

        </Routes>
    );
};

export default App;
