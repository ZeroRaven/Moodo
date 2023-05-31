// import axios from 'axios';
// import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Container,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const RegisterForm = () => {
  // const { register, isLoadingUser } = useAuth();
  // Button.isLoading = isLoadingUser;
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData);
    try {
      if (body["password"] === body["password1"]) {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          body["email"],
          body["password"]
        );
        console.log(userCredentials.user);
      } else {
        setError("Sorry passwords don't match");
      }
    } catch (err) {
      // Show error message
      const errorCode = err.code;
      const errorMessage = err.message;
      setError(errorCode, errorMessage);
    }
  };

  return (
    <Container maxW="md" pt={7}>
      {error && <Text color="red">{error}</Text>}
      <form onSubmit={handleRegisterSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email: </FormLabel>
          <Input
            variant="flushed"
            type="text"
            name="email"
            placeholder="cookie_123"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password1">Enter Password: </FormLabel>
          <Input variant="flushed" type="password" name="password" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password2">Enter Password Again: </FormLabel>
          <Input variant="flushed" type="password" name="password1" />
          <FormHelperText>Your passwords must match.</FormHelperText>
        </FormControl>
        <Button type="submit" mt={4}>
          Register
        </Button>
      </form>
      <Text>
        Already have an account? <Link to="/login" color='teal.500'>Sign in</Link>
      </Text>
    </Container>
  );
};

export default RegisterForm;
