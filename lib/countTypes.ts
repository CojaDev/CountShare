interface Comments {
  id?: string;
  name: string;
  text: string;
  date: Date;
  userImage?: string;
  likes?: number;
  replies?: Comments[];
  isLiked?: boolean;
}
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
  comments?: Comments[];
  _id?: string;
}
