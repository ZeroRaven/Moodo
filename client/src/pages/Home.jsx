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
} from "@chakra-ui/react";
import { VscSmiley } from "react-icons/vsc";
import homeStyles from "./Home.module.css"
import { useState } from "react";
import MoodSlider from "../components/MoodSlider";

const Home = () => {
    
  return (
    <Container className={homeStyles.waveContainer} bg='themeColor.beige' maxWidth='100%' centerContent >
      <MoodSlider/>
    </Container>
  );
};

export default Home;
