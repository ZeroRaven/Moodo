import {
  Box,
  Button,
  Container,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { VscSmiley } from "react-icons/vsc";
import homeStyles from "./Home.module.css";
import { useState } from "react";
import MoodSlider from "../components/MoodSlider";
import MoodGraph from "../components/MoodGraph";

const Home = () => {
    const [isOpen, setIsOpen] = useBoolean();

  const handleShowMoodGraph = () => {};

  return (
    <Container
      className={homeStyles.waveContainer}
      bg="themeColor.beige"
      maxWidth="100%"
      centerContent
    >
      <MoodSlider />
      <Button onClick={setIsOpen.toggle}>
        Have a look at your Mood Graph
      </Button>
      {isOpen && <MoodGraph />}
    </Container>
  );
};

export default Home;
