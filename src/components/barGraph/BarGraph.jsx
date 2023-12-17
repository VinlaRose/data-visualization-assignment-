import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, CartesianGrid, Line } from 'recharts';

const CustomTooltip = ({ active, payload, label, age, gender }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value.toFixed(2)} Hrs were spent on ${label} task`}</p>
      </div>
    );
  }

  return null;
};

const BarGraph = ({ data }) => {
  const [totalTaskArray, setTotalTaskArray] = useState(null);

  const age = data[0].age;
  const gender = data[0].gender;

  const totalValues = data?.reduce((acc, entry) => {
    Object.keys(entry).forEach(key => {
      if (['A', 'B', 'C', 'D', 'E', 'F'].includes(key) && entry[key]) {
        acc[key] = (acc[key] || 0) + parseInt(entry[key], 10) / 60;
      }
    });
    return acc;
  }, {});

  const totalData = Object.keys(totalValues).map(key => ({ category: key, value: totalValues[key] }));

  const handleBarClick = (event) => {
    const clickedTask = event.category;
    console.log(clickedTask);
    console.log(data);

    // Function to calculate the total value of the clicked task for each day
    function calculateTotalTask(arr, clickedTask) {
      const result = {};

      arr.forEach(obj => {
        const day = obj.day;
        const taskValue = parseInt(obj[clickedTask], 10) || 0; // Convert task value to integer

        if (!result[day]) {
          result[day] = { day, total: 0 };
        }

        result[day].total += taskValue;
      });

      // Convert the result object to an array
      const resultArray = Object.values(result);

      return resultArray;
    }

    // Calculate total value of clicked task for each date
    const newTotalTaskArray = calculateTotalTask(data, clickedTask);

    // Set the state to trigger a re-render
    setTotalTaskArray(newTotalTaskArray);

    // Output the result
    console.log(`Total ${clickedTask}`, newTotalTaskArray);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart layout="vertical" data={totalData}>
          <XAxis type="number" tickFormatter={(value) => `${value} Hrs`} />
          <YAxis dataKey="category" type="category" />
          <Tooltip content={<CustomTooltip age={age} gender={gender} />} />
          <Legend />
          <Bar dataKey="value" fill="rgba(75,192,192,0.4)" onClick={handleBarClick} />
        </BarChart>
      </ResponsiveContainer>
      <div>
        {totalTaskArray && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={totalTaskArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#1a1a1a" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BarGraph;
