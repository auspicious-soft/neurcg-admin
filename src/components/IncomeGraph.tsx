import React from 'react';
import { Card } from "@mui/material";
import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 3400 },
  { name: 'Feb', value: 2210 },
  { name: 'Mar', value: 1090 },
  { name: 'Apr', value: 3000 },
  { name: 'May', value: 2181 },
  { name: 'Jun', value: 2500 },
  { name: 'Jul', value: 500 },
  { name: 'Aug', value: 2450 }, 
  { name: 'Sep', value: 1500 },
  { name: 'Oct', value: 0 },
  { name: 'Nov', value: 2600 },
  { name: 'Dec', value: 2800 }
]

interface IncomeProps {
    incomeThisMonth: number,
    incomeData: object
}

const IncomeGraph = (props: IncomeProps) => {
  const {incomeThisMonth,  incomeData} = props
  return (
    <Card sx={{ p: 2, backgroundColor: '#E87223', color: 'white', borderRadius: '10px', boxShadow: '0' }}>
      <h2 className='text-2xl md:text-[36px] font-[700] mb-1 leading-[normal] '>${incomeThisMonth}</h2>
      <h3 className='text-sm  '>Income this month</h3>
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={data}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'white', fontSize: 12 }}   
            interval={0}                             
            axisLine={false}                         
            tickLine={false}                         
            minTickGap={0}                           
            //angle={-30}                             
            dy={10}
            padding={{ left: 10, right: 10 }} 
          />
          <CartesianGrid strokeDasharray="0 3" />
          <Line type ="monotone" dataKey="value" stroke="white" strokeWidth={4} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeGraph;
