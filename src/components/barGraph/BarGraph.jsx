import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label, age, gender }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value.toFixed(2)} Hrs were spent on ${label} task  `}</p>
      </div>
    );
  }

  return null;
};

const BarGraph = ({ data }) => {
  console.log(data[0].age)
  const age = data[0].age;
  const gender = data[0].gender
  
  const totalValues = data?.reduce((acc, entry) => {
    Object.keys(entry).forEach(key => {
      if (['A', 'B', 'C', 'D', 'E', 'F'].includes(key) && entry[key]) {
        acc[key] = (acc[key] || 0) + parseInt(entry[key], 10)/(60);
      }
    });
    return acc;
  }, {});
// console.log(totalValues)
  
  const totalData = Object.keys(totalValues).map(key => ({ category: key, value: totalValues[key] }));
// console.log(totalData);

const handleBarClick = (event) => {
    console.log(event.category)
    
    
  };
  return (
    <div>
     
      <ResponsiveContainer width="100%" height={400}>
        <BarChart layout="vertical" data={totalData} >
          <XAxis type="number"  tickFormatter={(value) => `${value} Hrs`}/>
          <YAxis dataKey="category" type="category" />
          <Tooltip content={<CustomTooltip age={age} gender={gender} />} />
          <Legend />
          <Bar dataKey="value" fill="rgba(75,192,192,0.4)" onClick={handleBarClick}   />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
