import React, { useEffect, useState } from "react";
import {TagCloud} from "react-tagcloud";

const Emotion = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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
          count: item.count,
          value: item._id.charAt(0).toUpperCase() + item._id.slice(1),
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
          <TagCloud
            minSize={20}
            maxSize={100}
            tags={data}
            onClick={(tag) => alert(`'${tag.value}' was selected!`)}
          />
        </div>
      )}
    </div>
  );
};

export default Emotion;
