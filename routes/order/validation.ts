import * as yup from 'yup';

const createSchema = yup.object().shape({
  body: yup.object({
    
    quantity: yup.number().required().min(0),

    price: yup.number().required().min(0),

    discount: yup.number().required().min(0),

    paymentType: yup
        .string()
        .required()
        .oneOf(["CASH", "CREDIT CARD"], "Phương thức thanh toán không hợp lệ"),

      status: yup
        .string()
        .required()
        .oneOf(["WAITING", "COMPLETED", "CANCELED"], "Trạng thái không hợp lệ"),

      customerId: yup
      .number().integer().positive().required(),


      employeeId: yup
      .number().integer().positive().required(),

  }),
});

export default createSchema;