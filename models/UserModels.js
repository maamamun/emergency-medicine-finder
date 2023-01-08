const dbConnect = require('../config/database');

const UserModels = {

  signup: async (firstName, lastName, email, phone, house, road, upazila, zila, role, pass) => {
    const sql = 'INSERT INTO `users`(`first_name`, `last_name`, `email`, `phone`, `house`, `road`, `upazila`, `zila`, `role`, `pass`) VALUES(?,?,?,?,?,?,?,?,?,?)';
    const values = [firstName, lastName, email, phone, house, road, upazila, zila, role, pass]
    const [rows] = await dbConnect.promise().execute(sql, values);
    return rows;
  },

  adminSignup: async (userid, pass) => {
    const sql = 'INSERT INTO `admin`( `user_id`, `pass`) VALUES (?,?)';
    const values = [userid, pass]
    const [rows] = await dbConnect.promise().execute(sql, values);
    return rows;
  },

  login: async (email) => {
    const sql = `SELECT * FROM users Where email="${email}" `;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  adminLogin: async (userid) => {
    const sql = `SELECT * FROM admin WHERE user_id="${userid}" `;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  addMedicineByAdmin: async (brandName,generics,dosgaeForm,strengthMg,company) => {
    const sql = 'INSERT INTO `orgmedicin`(`brand_name`, `generics`, `dosgae_form`, `strength_mg`, `company`) VALUES (?,?,?,?,?)';
    const values = [brandName,generics,dosgaeForm,strengthMg,company]
    const [rows] = await dbConnect.promise().execute(sql, values);
    return rows;
  },

  getMedicineData: async () => {
    const sql = 'SELECT * FROM orgmedicin';
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  getUser: async () => {
    const sql = 'SELECT * FROM users';
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  getAdmin: async (userid) => {
    const sql = `SELECT * FROM admin WHERE user_id="${userid}"`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  updateStatus: async (userId) => {
    // const sql = `UPDATE admin SET status = 1 WHERE id  = ${userId}`
    const sql = `UPDATE users SET status = 1 WHERE u_id  = ${userId}`
    const [row] = await dbConnect.promise().execute(sql)
    return row
  },
};

module.exports = UserModels;
