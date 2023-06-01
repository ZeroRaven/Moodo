import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
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

const Home = () => {
    const [feel, setFeel] = useState('')
const handleMoodBarChange =(e)=>{
    if (e===0){
        setFeel('Depressed')
    }else if(e===25){
        setFeel('Sad')
    }else if(e===50){
        setFeel('Alright')
    }else if(e===75){
        setFeel('Happy')
    }else if(e===100){
        setFeel('Amazing!')
    }
}
  return (
    <Container className={homeStyles.waveContainer} bg='themeColor.beige' maxWidth='100%' centerContent >
      <VStack m={20} bg="themeColor.pastel" p='5rem' borderRadius={40} w='40rem' zIndex={100}>
        <Heading>Mood Tracker</Heading>
        <Text fontSize="2xl">How are you doing today?</Text>
        {feel &&<Text mt={5}>I am {feel}</Text>}
        <Slider aria-label="mood-slider" defaultValue={0} step={25} colorScheme='orange' onChange={handleMoodBarChange}>
          <SliderMark value={0} mt="5" ml="-2.5" fontSize="md">
            Awful
          </SliderMark>
          <SliderMark value={25} mt="5" ml="-2.5" fontSize="md">
            Bad
          </SliderMark>
          <SliderMark value={50} mt="5" ml="-2.5" fontSize="md">
            Ok
          </SliderMark>
          <SliderMark value={75} mt="5" ml="-2.5" fontSize="md">
            Good
          </SliderMark>
          <SliderMark value={100} mt="5" ml="-2.5" fontSize="md">
            Great!{" "}
          </SliderMark>
          <SliderTrack bg="yellow.100">
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color='orange.400' as={VscSmiley} />
          </SliderThumb>
        </Slider>
        
        <Button type="submit" mt={10} bgColor='themeColor.yellow'>Confirm</Button>
      </VStack>
    </Container>
  );
};

export default Home;
