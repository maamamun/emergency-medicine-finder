const dbConnect = require('../config/database');

const UserModels = {

  signup: async (firstName, lastName, email, phone, house, road, upazila, zila, role, pass) => {
    const sql = 'INSERT INTO `users`(`first_name`, `last_name`, `email`, `phone`, `house`, `road`, `upazila`, `zila`, `role`, `pass`) VALUES(?,?,?,?,?,?,?,?,?,?)';

    const values = [firstName, lastName, email, phone, house, road, upazila, zila, role, pass]

    const [rows] = await dbConnect.promise().execute(sql, values);
    return rows;
  },

  login: async (email) => {
    const sql = `SELECT * FROM users Where email="${email}" `;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  medicine: async (firstName, lastName, email, phone, house, road, upazila, zila, role, pass) => {
    const sql = 'INSERT INTO `users`(`first_name`, `last_name`, `email`, `phone`, `house`, `road`, `upazila`, `zila`, `role`, `pass`) VALUES(?,?,?,?,?,?,?,?,?,?)';

    const values = [firstName, lastName, email, phone, house, road, upazila, zila, role, pass]

    const [rows] = await dbConnect.promise().execute(sql, values);
    return rows;
  },

  getUser: async (firstName, lastName, email, phone, house, road, division, upazila, zila, role, pass) => {
    const sql = 'SELECT * FROM users';
    const values = [firstName, lastName, email, phone, house, road, division, upazila, zila, role, pass]
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },
  updateStatus: async (userId) => {
    const sql = `UPDATE users SET status = 1 WHERE u_id  = ${userId}`
    const [row] = await dbConnect.promise().execute(sql)
    return row
  },
};

module.exports = UserModels;
