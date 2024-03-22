import React, { useEffect, useState, useCallback } from "react";
import WordCloud from "react-d3-cloud";
import Tooltip from "@mui/material/Tooltip";

const Emotion = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const onWordMouseOver = useCallback((word) => {
    console.log({word});
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/emotions/topic/:${props.topic}`
        );
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        const words = result.map((item) => ({
          value: item.count,
          text: item._id.charAt(0).toUpperCase() + item._id.slice(1),
        }));
        setData(words);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [props.topic]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="containerEmotion">
      {props.topic === "" ? (
        <div></div>
      ) : (
        <div>
          <Tooltip title="Delete">
            <h3>Emotions</h3>
          </Tooltip>
          <Tooltip title="Delete">
            <WordCloud
              data={data}
              // width={400}
              height={250}
              font="Times"
              fontWeight="bold"
              fontSize={(word) => Math.log2(word.value) * 5}
              spiral="rectangular"
              rotate={(word) => (Math.random() > 0.5 ? 90 : 0)}
              padding={5}
              random={Math.random}
              onWordMouseOver={onWordMouseOver}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Emotion;
