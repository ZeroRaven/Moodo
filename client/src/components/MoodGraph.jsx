import { Container } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { useFireStore } from "../contexts/FirestoreProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import moodGraphStyles from "./MoodGraph.module.css";

const MoodGraph = () => {
  const { queryForMoodInfo } = useFireStore();
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const getQuery = async () => {
      const queryArr = [];
      const queryRes = await queryForMoodInfo(user.uid);
      queryRes.forEach((snap) => {
        const data = snap.data();
        queryArr.push([data["date"].toDate(), data["feel"][1]]);
      });

      setChartData(queryArr);
    };
    getQuery();
  }, []);
  const options = {
    title: "Mood Graph",
    curveType: "function",
    backgroundColor: {
      fill: "transparent",
    },

  };
  const data = chartData && [
    [{ type: "date", label: "Day" }, "Mood"],
    ...chartData,
  ];
  return (
    <Container>
      {chartData && console.log(chartData)}
      <Chart
        className={moodGraphStyles.chart}
        chartType="LineChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </Container>
  );
};

export default MoodGraph;
