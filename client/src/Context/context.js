import md5 from "md5";
import { createContext } from "react";
export const SignupContext = createContext();
export const HostMainContext = createContext();
export const UserHomeContext = createContext();
export const carDetailsContext = createContext();

export const getGravatarUrl = (email, size = 100) => {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};