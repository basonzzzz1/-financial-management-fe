import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./component/Login";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import Home from "./component/Home";


function App() {
  return (
    <div>
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/home"} element={<Home/>}/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
