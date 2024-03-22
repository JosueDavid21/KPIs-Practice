import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Topic = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setId(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/topics");
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Topic</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={id}
        label="Topic"
        onChange={handleChange}
      >
        {data.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item._id.charAt(0).toUpperCase() + item._id.slice(1)}
          </MenuItem>
        ))}
      </Select>
      <div style={{ margin: "20px 0px" }}>
        Comentarios: {data.find((item) => item._id === id)?.count}
      </div>
    </FormControl>
  );
};

export default Topic;
