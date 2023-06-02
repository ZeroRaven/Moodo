import { Container } from "@chakra-ui/react";
import homeStyles from "./Home.module.css";
import MoodSlider from "../components/MoodSlider";

const Home = () => {
  return (
    <Container
      className={homeStyles.waveContainer}
      bg="themeColor.beige"
      maxWidth="100%"
      centerContent
    >
      <MoodSlider />
    </Container>
  );
};

export default Home;
