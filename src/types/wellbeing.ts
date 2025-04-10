
export interface AppUsage {
  id: string;
  name: string;
  icon: string;
  timeSpent: number; // in minutes
  category: 'productive' | 'neutral' | 'distracting';
  color?: string;
}

export interface DailyUsage {
  date: string;
  totalScreenTime: number; // in minutes
  focusScore: number; // percentage
  appUsage: AppUsage[];
  timeOffline: number; // in minutes
  hourlyBreakdown: {
    hour: number;
    productive: number;
    neutral: number;
    distracting: number;
  }[];
  pickups: number;
}
