export interface IUser {
  name: string;
  age: number;
  email: string;
  photoURL: string;
  role: "user" | "admin";
  userStatus: "active" | "inactive";
}
