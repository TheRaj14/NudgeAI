
import { useState, useEffect } from 'react';
import { AppUsage, DailyUsage } from '@/types/wellbeing';

// Mock data for the wellbeing dashboard
const mockApps: AppUsage[] = [
  {
    id: '1',
    name: 'NUDGE AI',
    icon: 'O',
    timeSpent: 148, // 2h 28m
    category: 'neutral',
    color: '#4ade80'
  },
  {
    id: '2',
    name: 'X',
    icon: 'X',
    timeSpent: 82, // 1h 22m
    category: 'distracting',
    color: '#f87171'
  },
  {
    id: '3',
    name: 'Instagram',
    icon: 'I',
    timeSpent: 57, // 57m
    category: 'distracting',
    color: '#ec4899'
  },
  {
    id: '4',
    name: 'Etsy',
    icon: 'E',
    timeSpent: 56, // 56m
    category: 'distracting',
    color: '#f97316'
  },
  {
    id: '5',
    name: 'Settings',
    icon: 'S',
    timeSpent: 25, // 25m
    category: 'neutral',
    color: '#a3e635'
  },
  {
    id: '6',
    name: 'CREME',
    icon: 'C',
    timeSpent: 16, // 16m
    category: 'neutral',
    color: '#22d3ee'
  }
];

// Generate hourly breakdown data
const generateHourlyData = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    // Generate more activity during daytime hours (9am-5pm)
    const isDaytime = i >= 9 && i <= 17;
    hours.push({
      hour: i,
      productive: isDaytime ? Math.random() * 30 : Math.random() * 10,
      neutral: Math.random() * 15,
      distracting: isDaytime ? Math.random() * 20 : Math.random() * 5
    });
  }
  return hours;
};

const mockDailyData: DailyUsage = {
  date: new Date().toISOString(),
  totalScreenTime: 217, // 3h 37m
  focusScore: 80,
  appUsage: mockApps,
  timeOffline: 638, // 10h 38m
  hourlyBreakdown: generateHourlyData(),
  pickups: 3
};

export function useWellbeingData() {
  const [dailyData, setDailyData] = useState<DailyUsage>(mockDailyData);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDailyData(mockDailyData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Function to format minutes to hours and minutes
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };

  // Function to format seconds
  const formatSeconds = (seconds: number): string => {
    return `${seconds}s`;
  };

  return {
    dailyData,
    isLoading,
    formatTime,
    formatSeconds
  };
}
