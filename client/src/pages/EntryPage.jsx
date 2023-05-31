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
  Text
} from "@chakra-ui/react";

import {
    getAuth,
    connectAuthEmulator,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { auth } from "../firebaseConfig";

const LoginForm = () => {
//   const { login } = useAuth();
  const [error, setError] = useState(null)


  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData);
    try {
      const userCred = await signInWithEmailAndPassword(auth, body['email'], body["password"]);
      console.log(userCred.user)
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        setError(errorCode, errorMessage);
    }
  };

  return (
    <Container maxW="md" pt={7}>
      {error && <Text color="red">{error}</Text>}

      <form onSubmit={handleLoginSubmit}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            variant="flushed"
            type="text"
            placeholder="cookie_123"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" name="password" variant="flushed" />
        </FormControl>
        <Button type="submit" mt={4}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
