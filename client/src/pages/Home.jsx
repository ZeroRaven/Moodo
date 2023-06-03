import { Container, Heading, VStack } from "@chakra-ui/react";
import homeStyles from "./Home.module.css";
import MoodSlider from "../components/MoodSlider";
import MoodTips from "../components/MoodTips";
import Breathe from "../components/Breathe";

const Home = () => {
  return (
    <VStack>
    <Container
      className={homeStyles.waveContainer}
      bg="themeColor.beige"
      maxWidth="100%"
      centerContent
      position="relative"
    >
      <MoodSlider />
    </Container>
    <Container maxWidth="100%" centerContent mt={10}>
        <Heading>Take a Moment to Breath...</Heading>
        <Breathe/>
    </Container>
    <Container maxWidth="100%" centerContent>
        <MoodTips/>
    </Container>
    </VStack>
  );
};

export default Home;
