"use client";
import { CountdownCard } from '@/components/CountdownCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Countdown {
  _id: string;
  name: string;
  description: string;
  date: string;
  backgroundColor: string;
  textColor: string;
  backgroundImage?: string;
  createdBy: string;
  creatorName:string;
}

export function CountdownGridHero() {
const [countdowns, setCountdowns] = useState([]);

useEffect(() => {
  const fetchCountdowns = async () => {
    try {
      const response = await axios.get('/api/countdowns');
      const data = response.data;
      setCountdowns(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching countdowns:', error);
    }
  };

  fetchCountdowns();
},[])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {countdowns.map((countdown:Countdown) => (
        <CountdownCard
          key={countdown._id}
          {...countdown}
          onEdit={undefined}
          onDelete={undefined}
          showActions={false}
        />
      ))}
    </div>
  );
}

