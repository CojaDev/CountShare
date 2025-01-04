interface Countdown {
    id: string;
  }
  export interface UserTypes {
    userID: string;
    name: string;
    email: string;
    password?: string;
    bio?: string;
    premium: boolean;
    countdowns: Countdown[];
    pfp?: string;
    dateCreated: Date;
  }
  