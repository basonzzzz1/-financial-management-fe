import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "./index.css";

import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import React, {Suspense} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)
root.render(
        <Provider store={store}>
            <BrowserRouter>
                <Suspense fallback={loading}>
                    <App/>
                    <ToastContainer/>
                </Suspense>
            </BrowserRouter>
        </Provider>
);
