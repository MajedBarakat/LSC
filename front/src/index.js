import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import axios from "axios";

window.axios = axios;

const root = createRoot(document.querySelector("#root"))
root.render(<App />);