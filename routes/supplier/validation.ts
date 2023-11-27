import * as yup from 'yup';

const validationSchema = yup.object().shape({
  body: yup.object({
    name: yup.string().max(500, "Tên Quá dài").required("Không được bỏ trống"),

    email: yup
      .string()
      .email()
      .max(50, "Email Quá dài")
      .required("Không được bỏ trống"),

    phoneNumber: yup
      .string()
      .max(50, "Sdt quá dài")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại sai rồi")
      .required("Không được bỏ trống"),

    address: yup
      .string()
      .max(50, "Address Quá dài")
      .required("Không được bỏ trống"),
  }),
});

export default validationSchema;