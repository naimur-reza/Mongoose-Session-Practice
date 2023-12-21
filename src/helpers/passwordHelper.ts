import bcrypt from "bcrypt";

export const hashedPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
