import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const Emotion = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const options = {
    enableTooltip: true,
    fontFamily: "impact",
    fontSizes: [16, 80],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 5,
    rotations: 2,
    rotationAngles: [0, -90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1500,
  };

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
          <h3>Emotions</h3>
          <ReactWordcloud maxWords={10} options={options} words={data} />
        </div>
      )}
    </div>
  );
};

export default Emotion;
