// import { Request } from 'express';
// import { ISqlTypeFactoryWithNoParams, ISqlTypeWithNoParams } from 'mssql';
// import * as yup from 'yup';

// // Để mô phỏng ObjectId trong mssql, bạn có thể sử dụng kiểu dữ liệu tương ứng, ví dụ: UniqueIdentifier
// type ObjectId = ISqlTypeWithNoParams<'int'>;

// // Sử dụng ISqlTypeFactoryWithNoParams để đại diện cho hàm tạo kiểu dữ liệu tương ứng
// const mssql = {
// ObjectId: (): ObjectId => {
// return { type: 'uniqueidentifier' };
// },
// };

// // Sử dụng trong schema validation
// const validationSchema = yup.object({
// params: yup.object({
// id: yup
// .string()
// .test("Id sai định dạng", "${path} không phải kiểu ObjectID", (value) => {

// // Ví dụ:
// // const isValid = mssql.validateObjectId(value);
// // return isValid;
// }),
// }),
// });