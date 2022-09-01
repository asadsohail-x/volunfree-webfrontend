import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App2";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./theme";

import store from "./redux/store";
import { Provider } from "react-redux";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <App />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </LocalizationProvider>
);

reportWebVitals();
