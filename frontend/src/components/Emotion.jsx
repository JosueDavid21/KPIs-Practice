import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import "./KPIs/KPI_emotions.css";

const Emotion = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const options = {
    legend: { show: false },
    chart: { type: "treemap" },
    title: {
      text: "Emociones",
      align: "center",
    },
    colors: [
      "#3B93A5",
      "#F7B844",
      "#ADD8C7",
      "#EC3C65",
      "#CDD7B6",
      "#C1F666",
      "#D43F97",
      "#1E5D8C",
      "#421243",
      "#7F94B0",
      "#EF6537",
      "#C0ADDB",
    ],
    plotOptions: {
      treemap: { distributed: true, enableShades: false },
    },
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

        const array = [
          {
            data: [],
          },
        ];
        const datos = result.map((item) => ({
          x: item._id.charAt(0).toUpperCase() + item._id.slice(1),
          y: item.count,
        }));
        datos.forEach((dato) => {
          array[0].data.push(dato);
        });
        setData(array);
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
        <div>Emociones</div>
      ) : (
        <div>
          <div id="chart">
            <ReactApexChart
              options={options}
              series={data}
              type="treemap"
            />
          </div>
          {/* <div id="html-dist"></div> */}
        </div>
      )}
    </div>
  );
};

export default Emotion;
