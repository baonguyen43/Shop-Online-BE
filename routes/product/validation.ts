import * as yup from 'yup';

const validationSchema = yup.object().shape({
  body: yup.object({
    name: yup
      .string()
      .max(50, "Tên quá dài")
      .required("Tên không được bỏ trống"),
      price: yup
      .number()
      .min(0, "Giá không thể âm")
      .integer()
      .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),

    discount: yup
      .number()
      .min(0, "Giảm giá không thể âm")
      .max(75, "Giảm giá quá lớn")
      .integer()
      .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),

    stock: yup
      .number()
      .min(0, "Số lượng không hợp lệ")
      .integer()
      .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),

    description: yup
      .string()
      .max(3000, "Mô tả quá dài")
      .required(({ path }) => `${path.split(".")[1]} không được bỏ trống`),

      categoryId: yup
      .number().integer().positive().required(),
      

    supplierId: yup
    .number().integer().positive().required(),

  }),
});

const validationQuerySchema = yup.object().shape({
  query: yup.object({
    categoryId: yup
    .number().integer().positive().required(),

      supplierId: yup
         .number().integer().positive().required(),


    name: yup.string(),

    stockStart: yup.number().min(0),

    stockEnd: yup.number(),

    discountStart: yup.number().min(0),

    discountEnd: yup.number().max(50),

    skip: yup.number(),

    limit: yup.number(),
  }),
});

module.exports = {
  validationSchema,
  validationQuerySchema,
};