import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Sentiment from "../Sentiment";
import Emotion from "../Emotion";

import "./KPI_emotions.css";

const KPI_emotions = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [error, setError] = useState(null);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/topics");
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        setTopics(result);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/sentiment/topic/:${selectedTopic}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        const sentimentData = result.map((item) => ({
          value: item.count,
          name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
        }));
        setSentiment(sentimentData);
      } catch (error) {
        setError(error);
      }
    };
    if (selectedTopic) {
      fetchData();
    }
  }, [selectedTopic]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="conatinerKPIemotions">
      <div className="containerLeft">
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <InputLabel id="demo-select-small-label">Topic</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedTopic}
            label="Topic"
            onChange={handleTopicChange}
          >
            {topics.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item._id.charAt(0).toUpperCase() + item._id.slice(1)}
              </MenuItem>
            ))}
          </Select>
          <div style={{ margin: "25px 0px" }}>
            Comentarios:{"   "}
            {topics.find((item) => item._id === selectedTopic)?.count}
          </div>
        </FormControl>
        <Sentiment data={sentiment} />
      </div>

      <div className="containerRigth">
        <Emotion topic={selectedTopic} />
      </div>
    </div>
  );
};

export default KPI_emotions;
