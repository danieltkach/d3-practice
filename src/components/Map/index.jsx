import React from 'react';
import { useData } from './useData';
import { Marks } from './Marks';

const width = 960;
const height = 500;

export const Map = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
        <Marks data={data} />
    </svg>
  );
};