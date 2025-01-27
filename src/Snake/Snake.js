import React from 'react';

const Snake = ({ snake }) => {
    if (!Array.isArray(snake)) {
        console.error('Snake prop is not an array:', snake);
        return null; // Връщай `null`, ако `snake` е недефинирана или не е масив
    }

    return (
        <>
            {snake.map((segment, index) => (
                <div
                    key={index}
                    className="snake-segment"
                    style={{
                        gridRowStart: segment[0] + 1,
                        gridColumnStart: segment[1] + 1,
                    }}
                ></div>
            ))}
        </>
    );
};

export default Snake;
