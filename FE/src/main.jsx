import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <Provider> */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      {/* </Provider> */}
    </ChakraProvider>
  </React.StrictMode>
);
