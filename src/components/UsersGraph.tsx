/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { convertDateToMonth } from '@/utils';

// Custom YAxis tick formatter to format large numbers as "k" and skip 10000
const yAxisTickFormatter = (value: number) => {
  if (value === 10000) return '';
  if (value < 1000) return value.toString(); 
  return `${value / 1000}k`;
};

const UsersGraph = (props: any) => {
  const { userData } = props
  const [userGrowth, setUserGrowth] = useState<{ name: string, value: number }[]>([])
  useEffect(()=> {
    const transformedData = (userData as any)?.months?.map((month: string, index: number) => ({
      name: convertDateToMonth(month),
      value: userData.count[index]
    }));
    setUserGrowth(transformedData)
  }, [userData])
  return (
    <Card sx={{ borderRadius: '10px', boxShadow: '0px 0px 40px 0px rgba(235, 130, 60, 0.06)' }}>
      <h2 className='section-title px-[30px] py-[15px] border-b border-[#FCF3ED]'>Users</h2>
      <div className='p-5 pl-0 text-[#6B6B6B]'>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={userGrowth}>
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
