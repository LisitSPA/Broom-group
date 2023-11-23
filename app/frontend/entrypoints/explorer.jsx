import "./stylesheets/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Explorer } from "@/src";
import { SnackbarUtilitiesConfigutator } from "../src/helpers/snackbar-manager";
import { SnackbarProvider } from "notistack";

const { store, persistor } = configureStore();


const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={LoadingSpinner} persistor={persistor}>
        <SnackbarProvider>
          <SnackbarUtilitiesConfigutator />
          <Explorer />
        </SnackbarProvider>
      </PersistGate>
    </Provider>,
    document.getElementById("app")
  );
});
