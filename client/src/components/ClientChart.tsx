import React, { useContext } from "react";
import { PieChart, Pie, Cell, LabelList } from 'recharts';
import { Context } from "..";
import { createDataCliets, generateColors } from "../utils/clientHelper";

const colors: string | any[] = [];
const RADIAN = Math.PI / 180;

generateColors(6, colors);

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <>
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  </>
  );
};

const ClientChart = () => {

  const {client}: any = useContext(Context)
  const data: any = [];

  createDataCliets(client, data);
  
  return (
    <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            legendType="line"
          >
            {data.map((_entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            <LabelList dataKey="name" position="outside" offset={40} fontSize="20" fontWeight={900}/>
          </Pie>
          
        </PieChart>
  )
}

export default ClientChart;
