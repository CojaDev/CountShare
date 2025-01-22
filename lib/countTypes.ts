export interface CountdownData {
    
    name: string;
    date: string;
    font: string;
    textColor: string;
    backgroundColor: string;
    backgroundImage: string;
    description: string;
    fontSize: number;
    showSeconds: boolean;
    showLabels: boolean;
    enableNotifications: boolean;
    notificationEmail: string;
    customCSS: string;
    isPublic: boolean;
    customBackgroundImage: File | null;
    showWatermark: boolean;
  }