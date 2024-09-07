import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  </StrictMode>,
);
