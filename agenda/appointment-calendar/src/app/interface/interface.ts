export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    accessLevel: 'admin' | 'user';
  }

  export interface ICommitment {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    contactId: string;
    localId: string;
    userId: string;
  }

  export interface IContact {
    id: string;
    name: string;
    phone: string;
    email: string;
    userId: string;
  }

  export interface ILocation {
    id: string;
    name: string;
    address: string;
  }

 export interface ErrorResponse {
    status: number;
    error: { message?: string };
  }
