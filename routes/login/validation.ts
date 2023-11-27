import * as yup from 'yup';

module.exports = {
  loginSchema: yup.object({
    body: yup.object({
      email: yup.string().required().email(),
    
      password: yup
        .string()
        .required()
        .min(5, "Không được ít hơn 3 ký tự")
        .max(12, "Không được vượt quá 12 ký tự"),
    }),
  }),
};