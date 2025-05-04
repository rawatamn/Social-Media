import yup from "yup";
import { LoginInput } from "../interface/interface.js";
const registerValidation = (data: any) => {
  const schema = yup.object({
    name: yup.string().min(3).max(15).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
  });
  return schema.validate(data);
};
const loginValidation = (data: LoginInput) => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
  });
  return schema.validate(data);
};
export { registerValidation, loginValidation };
