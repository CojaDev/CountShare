interface Countdown {
    id: string;
    name: string;
    description: string;
    jobImg?: string;
  }
  
  export interface UserTypes {
    userID: string;
    name: string;
    email: string;
    password?: string;
    bio?: string;
    countdowns: Countdown[];
    pfp?: string;
    dateCreated: Date;
  }
  