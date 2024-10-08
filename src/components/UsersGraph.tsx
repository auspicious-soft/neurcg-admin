import React from 'react';
import { Card } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const userData = [
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 10000 },
  { name: 'Mar', value: 15000 },
  { name: 'Apr', value: 30000 },
  { name: 'May', value: 18000 },
  { name: 'Jun', value: 25000 },
  { name: 'Jul', value: 15000 },
  { name: 'Aug', value: 20000 },
  { name: 'Sep', value: 35000 },
  { name: 'Nov', value: 45000 },
  { name: 'Dec', value: 30000 } 
];

// Custom YAxis tick formatter to format large numbers as "k" and skip 10000
const yAxisTickFormatter = (value: number) => {
  if (value === 10000) return '';
  return `${value / 1000}k`;
};

const UsersGraph: React.FC = () => {
  return (
    <Card sx={{ borderRadius: '10px', boxShadow: '0px 0px 40px 0px rgba(235, 130, 60, 0.06)' }}>
      <h2 className='section-title px-[30px] py-[15px] border-b border-[#FCF3ED]'>Users</h2>
      <div className='p-5 pl-0 text-[#6B6B6B]'>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={userData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E87223" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#F6C6A6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name"
              tickLine={false}  
              tick={{ fill: '#6B6B6B', fontSize: 14 }} // Apply custom color and font size to the labels
            />
            <YAxis 
              tickFormatter={yAxisTickFormatter} // Custom YAxis tick formatter
              tick={{ fill: '#6B6B6B', fontSize: 14 }}
              tickLine={false} 
            />
            <CartesianGrid strokeDasharray="0 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              strokeWidth={2}
              stroke="#E87223"
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UsersGraph;
