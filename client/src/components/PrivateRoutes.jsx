import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";

const PrivateRoutes = (props) => {
  const { user, isLoadingUser } = useAuth();
  if (isLoadingUser)
    return (
      <Container centerContent>
        <Heading size="lg">
          <Spinner mr="1rem" mt="10rem" size="xl" />
          ...LOADING
        </Heading>
      </Container>
    );
  return user ? <Outlet /> : <Navigate to={props.redirectTo} replace />;
};

export default PrivateRoutes;
