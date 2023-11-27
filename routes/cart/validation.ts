import * as yup from 'yup';

module.exports = {
    getDetailSchema: yup.object({
        params: yup.object({
          id: yup.number().integer().positive().required(),
        }),
      }),
    
      removeSchema: yup.object({
        body: yup.object({
          customerId: yup
            .number()
            .required(),
          productId: yup
          .number()
          .required(),
        }),
      }),

      createSchema: yup.object({
        body: yup.object({
          customerId: yup
          .number()
          .required(),
    
          productId: yup
          .number()
          .required(),
    
          quantity: yup.number().required().min(0),
        }),
      }),
    };
    