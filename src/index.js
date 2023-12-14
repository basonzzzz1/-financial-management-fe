import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "./index.css";

import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import {Suspense} from "react";

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
          </Suspense>
        </BrowserRouter>
    </Provider>
);
