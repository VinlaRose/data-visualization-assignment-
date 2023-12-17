import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, CartesianGrid, Line } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
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
const [chartTask, setChartTask] = useState("")
  const handleBarClick = (event) => {
    const clickedTask = event.category;
    setChartTask(clickedTask)
    console.log(clickedTask);
    console.log(data);

    function calculateTotalTask(arr, clickedTask) {
      const result = {};

      arr.forEach(obj => {
        const day = obj.day;
        const taskValue = parseInt(obj[clickedTask], 10) || 0; 

        if (!result[day]) {
          result[day] = { day, total: 0 };
        }

        result[day].total += taskValue;
      });

    
      const resultArray = Object.values(result);

      return resultArray;
    }

    
    const newTotalTaskArray = calculateTotalTask(data, clickedTask);

    
    setTotalTaskArray(newTotalTaskArray);

   
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
          <div>
            <h3>Chart of Total hours spent on task {chartTask} on the given dates</h3>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={totalTaskArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#1a1a1a" />
            </LineChart>
          </ResponsiveContainer>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default BarGraph;
