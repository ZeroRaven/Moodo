import {
  Box,
  Button,
  Container,
  Text,
  VStack,
  ButtonGroup,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { useFireStore } from "../contexts/FirestoreProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import moodGraphStyles from "./MoodGraph.module.css";
import MoodDisplays from "./MoodDisplays";
import { Link as ReactLink } from "react-router-dom";

const MoodGraph = () => {
  const { queryForMoodInfo } = useFireStore();
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getQuery = async () => {
      const queryArr = [];
      const moodsArr = [];
      const queryRes = await queryForMoodInfo(user.uid);
      queryRes.forEach((snap) => {
        const data = snap.data();
        moodsArr.push(data);
        queryArr.push([
          new Date(data["date"].toDate()).toLocaleString().split(",")[0],
          data["feel"][1],
        ]);
      });
      setMoodData(moodsArr);
      setChartData(queryArr);
      setIsLoading(false)
    };
    setIsLoading(true);
    getQuery();
  }, []);

  const groupedData = chartData.reduce((acc, [date, value]) => {
    if (acc[date]) {
      acc[date].moods.push(value);
    } else {
      acc[date] = {
        moods: [value],
      };
    }
    return acc;
  }, {});

  const avgData = Object.entries(groupedData).map(([date, { moods }]) => {
    const average = moods.reduce((acc, value) => acc + value, 0) / moods.length;
    return [date, average];
  });
  const options = {
    title: "Mood Graph",
    backgroundColor: {
      fill: "transparent",
    },
    vAxis: {
      title: "Moods",
      ticks: [
        { v: 0, f: "Awful" },
        { v: 25, f: "Bad" },
        { v: 50, f: "Ok" },
        { v: 75, f: "Good" },
        { v: 100, f: "Great" },
      ],
    },
    bar: {
      groupWidth: "10%",
    },
    dataOpacity: 0.8,
    legend: {
      position: "none",
    },
    colors: ["#CEE5D0", "#E0C097", "#F3F0D7", "#FF7878", "#FFC93C"],
  };
  const data = chartData && [["Date", "Mood"], ...avgData];
  if (isLoading)return <Container centerContent><Heading size='sm' mt={5}><Spinner/>...LOADING</Heading></Container>
  return (
    <Container maxW={"980px"}>
      {avgData[0] && (avgData.pop()[1] < 50) ? (
        <VStack bgColor="themeColor.beige" p={4} mt={5} borderRadius={15}>
          <Text>
            You seem sad... Would you like me to provide you some helpful facts
            to deal with depression?
          </Text>
          <ButtonGroup>
            <Button
              target="_blank"
              bgColor={"themeColor.pastel"}
              as={ReactLink}
              to={
                "https://www.lifeline.org.au/media/0jsl1fs2/rev1_ll-4pp-fact-sheet_depression.pdf"
              }
            >
              Depression Fact Sheet
            </Button>
            <Button
              bgColor={"themeColor.red"}
              as={ReactLink}
              to={"tel:+61 131114"}
            >
              Crisis Hotline
            </Button>
          </ButtonGroup>
        </VStack>
      ) : (
        <></>
      )}

      <Chart
        className={moodGraphStyles.chart}
        chartType="ColumnChart"
        data={data}
        options={options}
        width={"100%"}
        height={"500px"}
      />
      {moodData && <MoodDisplays moodData={moodData} />}
    </Container>
  );
};

export default MoodGraph;
