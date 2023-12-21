export interface IUser {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordChangedAt: string;
  photoURL: string;
  role: "user" | "admin";
  userStatus: "active" | "inactive";
}
