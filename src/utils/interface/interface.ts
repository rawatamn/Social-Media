export interface userAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  timeStamp?: Date;
}
export interface LoginInput {
  email: string;
  password: string;
}

export interface FindUserInput {
  userId: string;
}
