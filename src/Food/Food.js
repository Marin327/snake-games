import React from 'react';
const Food = ({ food }) => {
  return (
    <div
      style={{
        gridRowStart: food[0] + 1,
        gridColumnStart: food[1] + 1,
        backgroundColor: 'red',
        width: '20px',
        height: '20px',
      }}
    ></div>
  );
};

export default Food;