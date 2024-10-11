/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Card } from "@mui/material";
import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { convertDateToMonth } from '@/utils';

interface IncomeProps {
    incomeThisMonth: number,
    incomeData: any
}

const IncomeGraph = (props: IncomeProps) => {
  const {incomeThisMonth,  incomeData }  = props
  const [chartData, setChartData] = useState<{ name: string, value: number }[]>([])

  useEffect(() => {
    const transformedData = (incomeData as any)?.months?.map((month: string, index: number) => ({
      name: convertDateToMonth(month),
      value: incomeData.income[index]
    }));
    setChartData(transformedData)
  }, [incomeData])
  
  return (
    <Card sx={{ p: 2, backgroundColor: '#E87223', color: 'white', borderRadius: '10px', boxShadow: '0' }}>
      <h2 className='text-2xl md:text-[36px] font-[700] mb-1 leading-[normal] '>${incomeThisMonth}</h2>
      <h3 className='text-sm  '>Income this month</h3>
      <ResponsiveContainer width="100%" height={170}>
      <LineChart data={chartData}>
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
