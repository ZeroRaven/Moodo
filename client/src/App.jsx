import "./App.css";
import "@fontsource/poiret-one/400.css";
import "@fontsource/raleway/400.css";

import { Routes, Route, NavLink } from "react-router-dom";
import { Flex, Box, Heading, Spacer, ChakraProvider } from "@chakra-ui/react";

import theme from "./components/theme";
import { useAuth } from "./contexts/AuthProvider";
import LoginForm from "./components/LoginForm";
import NotFound from "./pages/NotFound";
import RegisterForm from "./components/RegisterForm";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Logout from "./components/Logout";
import MoodGraph from "./components/MoodGraph";
import Meditation from "./pages/Meditation";
import Journal from "./pages/Journal";
import Community from "./pages/Community";
import QuotesDisplay from "./components/QuotesDisplay";

function App() {
  const { user } = useAuth();
  return (
    <ChakraProvider theme={theme}>
      <Flex display={{md:'flex'}}
        as={"nav"}
        alignItems="center"
        gap="2"
        bgColor="themeColor.yellow"
        color="black"
      >
        <Box p="4">
          <NavLink to="/" aria-label="home">
            <Heading size="md">Moodo</Heading>
          </NavLink>
        </Box>
        <Spacer />
        {user ? (
          <>
            <Box p="4">
              <NavLink to="/journal">Journal</NavLink>
            </Box>
            <Box p="4">
              <NavLink to="/community">Community</NavLink>
            </Box>
            <Box p="4">
              <NavLink to="/meditation">Meditation Center</NavLink>
            </Box>
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
      <QuotesDisplay/>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/*" element={<NotFound />} />

        <Route element={<PrivateRoutes redirectTo="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/moodgraph" element={<MoodGraph />} />
          <Route path="/community" element={<Community />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
