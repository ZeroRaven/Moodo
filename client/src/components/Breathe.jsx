import {
  Button,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import circleStyles from "./Breathe.module.css";
import { useRef, useState } from "react";

const Breathe = () => {
  const [showInhale, setShowInhale] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef();
  const controlsText = useAnimation();
  const controlsCircle = useAnimation();

  const startAnimations = () => {
    setIsAnimating(true);
    controlsCircle.start((i) => ({
      scale: [1, (i + 0.5) / 2, (i + 0.5) / 2, 1],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
        repeatType: "reverse",
      },
    }));
    controlsText.start({
      scale: [1, 1.2, 1.2, 1],
      opacity: [0, 1, 0,0, 0, 1, 0],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
        repeatType: "reverse",
      },
    });

    intervalRef.current = setInterval(() => {
      setShowInhale(!showInhale);
    }, 4920);
  };

  const stopAnimations = () => {
    setIsAnimating(false);
    controlsCircle.stop();
    controlsText.stop();
    clearInterval(intervalRef.current);
  };

  return (
    <Stack>
      <Button
      bgColor='themeColor.yellow'
      colorScheme="yellow"
        onClick={isAnimating ? stopAnimations : startAnimations}
        mt={3}
        px={10}
        aria-label="breathing activity btn"
      >
        {isAnimating ? "Stop" : "Start"}
      </Button>
      <VStack
        my="15rem"
        id="breath"
        justifyContent="center"
        alignItems="center"
      >
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            className={circleStyles.circle}
            animate={controlsCircle}
            custom={item}
          ></motion.div>
        ))}
        <motion.div animate={controlsText}>
          <Text className={circleStyles.text} color="orange.800" fontSize="lg">
            {showInhale ? "Breath In" : "Breath out"}
          </Text>
        </motion.div>
      </VStack>
    </Stack>
  );
};

export default Breathe;
