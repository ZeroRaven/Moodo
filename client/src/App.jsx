import "./App.css";
import "@fontsource/poiret-one/400.css";
import "@fontsource/raleway/400.css";

import { Routes, Route, Link, useParams, NavLink } from "react-router-dom";
import { Flex, Box, Heading, Spacer, ChakraProvider, Container } from "@chakra-ui/react";

import theme from "./components/theme";
import { useAuth } from "./contexts/AuthProvider";
import LoginForm from "./components/LoginForm";
import NotFound from "./pages/NotFound";
import RegisterForm from "./components/RegisterForm";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Logout from "./components/Logout";

function App() {
  const {user} = useAuth()
  return (
    <ChakraProvider theme={theme}>
      <Flex alignItems="center" gap="2" bgColor="themeColor.yellow" color="black">
        <Box p="4">
          <NavLink to="/">
            <Heading size="md">Moodo</Heading>
          </NavLink>
        </Box>
        <Spacer />
        {user ? (
          <>
            <Box p="4">
              <NavLink to="/logout">Logout</NavLink>
            </Box>
          </>
        ) : (
          <>
            <Box p="4">
              <NavLink to="/login">Login</NavLink>
            </Box>
            <Box p="4">
              <NavLink to="/register">Register</NavLink>
            </Box>
          </>
        )}
      </Flex>




      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<PrivateRoutes redirectTo="/login" />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/:username" element={<UserPage />} />
          <Route path="/users" element={<UsersPage/>}/> */}
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
