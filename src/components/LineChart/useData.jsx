import React, {useState, useEffect} from 'react';
import {csv} from 'd3';

export const useData =(csvUrl)=> {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.temperature = +d.temperature;
			d.timestamp = new Date(d.timestamp);
      return d;
    };
    csv(csvUrl, row).then(data => {
      setData(data);
    }); 
  }, []);
  
  return data;
}