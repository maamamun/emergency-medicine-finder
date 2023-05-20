const dbConnect = require('../config/database');

const UserModels = {



  /* <====== Insert Data in DataBase =====> */
  /* ====== user Register Model ===== */
  insertRegisterM: async (firstName, lastName, gender, email, phone, propic, house, road, division, zila, upazila, pass) => {
    try {
      const insertRegis = 'INSERT INTO `users`(`first_name`, `last_name`, `gender`, `email`, `phone`, `propic`, `house`, `road`, `division`, `zila`, `upazila`, `pass`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
      const values = [firstName, lastName, gender, email, phone, propic, house, road, division, zila, upazila, pass];

      return await dbConnect.promise().execute(insertRegis, values);

    } catch (err) {

      return err;
    }
  },

  /* ====== worker Register Model ===== */
  insertWorkerRegisterM: async (firstName, lastName, gender, shopname, email, phone, propic, nid1, nid2, house, road, division, zila, upazila, lat, lng, pass) => {
    try {
      const insertRegis = 'INSERT INTO `worker`( `first_name`, `last_name`, `gender`, `shopname`, `email`, `phone`, `propic`, `nid1`, `nid2`, `house`, `road`, `division`, `zila`, `upazila`,lat, lng, `pass`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      const values = [firstName, lastName, gender, shopname, email, phone, propic, nid1, nid2, house, road, division, zila, upazila, lat, lng, pass];
      return await dbConnect.promise().execute(insertRegis, values);
    } catch (err) {
console.log(err)
      return err;
    }
  },
  /* ====== Service Insert Model ===== */
  medicine: async (mediname, meditype, medistrength, medigeneric, medicompany) => {
    const sql = 'INSERT INTO `medicine`(`name`, `type`, `strength`, `generic`, `company`) VALUES(?,?,?,?,?)';
    const values = [mediname, meditype, medistrength, medigeneric, medicompany]
    const [rows] = await dbConnect.promise().execute(sql, values);
    return rows;
  },

  shopmedicine: async (shopemail, mediname, meditype, medistrength, medigeneric, medicompany, medistock, mediprice) => {
    const sql = 'INSERT INTO `shopmedicine`( `shop_email`, `mediname`, `meditype`, `medistrength`, `medigeneric`, `medicompany`, `stock`, `price`) VALUES(?,?,?,?,?,?,?,?)';
    const values = [shopemail, mediname, meditype, medistrength, medigeneric, medicompany, medistock, mediprice]
    const [rows] = await dbConnect.promise().execute(sql, values);
    return rows;
  },

  /* <====== Catch Data from DataBase ===== >*/

  login: async (email) => {
    const sql = `SELECT * FROM users Where email="${email}" `;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  getUser: async (email) => {
    const sql = `SELECT * FROM users  Where email="${email}"`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  getService: async (sId) => {
    const sql = `SELECT * FROM org_service  Where ser_id="${sId}"`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },
  getMedicine: async (sId) => {
    const sql = `SELECT * FROM shopmedicine  Where shop_email="${sId}"`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },
  getallUser: async () => {
    const sql = `SELECT * FROM users `;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  getaService: async () => {
    const sql = `SELECT * from medicine`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },
  getallWorker: async () => {
    const sql = `SELECT * ,DATE_FORMAT(date,'%d/%c/%Y')as fdate FROM worker`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  getUserBooking: async (mail) => {
    const sql = `SELECT * ,DATE_FORMAT(ser_date,'%d/%c/%Y')as fdate FROM servicebooking WHERE user_email= ?`;
    const value = [mail];
    const [rows] = await dbConnect.promise().execute(sql, value);
    return rows;
  },

  getallBooking: async () => {
    const sql = `SELECT * ,DATE_FORMAT(ser_date,'%d/%c/%Y')as fdate FROM servicebooking`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  mailCatchM: async (mail) => {
    const getMail = 'SELECT * FROM users WHERE email= ?';
    const value = [mail];
    const [row] = await dbConnect.promise().execute(getMail, value);
    return row;
  },

  workermailCatchM: async (mail) => {
    const getMail = 'SELECT * FROM worker WHERE email= ?';
    const value = [mail];
    const [row] = await dbConnect.promise().execute(getMail, value);
    return row;
  },

  /* ====== Update DB ===== */
  updateStatus: async (userId) => {
    const sql = `UPDATE users SET status = 1 WHERE u_id  = ${userId}`
    const [row] = await dbConnect.promise().execute(sql)
    return row
  },

  workeracUpdateStatus: async (userId) => {
    const sql = `UPDATE worker SET status = 1 WHERE email  = '${userId}'`
    const [row] = await dbConnect.promise().execute(sql)
    return row
  },

  workerHoaldUpdateStatus: async (userId) => {
    const sql = `UPDATE worker SET status = 2 WHERE email  = '${userId}'`
    const [row] = await dbConnect.promise().execute(sql)
    return row
  },

  /* ====== user upadate Model ===== */
  UserUpadateM: async (firstName, lastName, gender, email, phone, propic, house, road, division, zila, upazila, pass, userId) => {
    try {
      const sql = `update users set first_name='${firstName}', last_name='${lastName}', gender='${gender}', email='${email}', phone='${phone}', propic='${propic}', house='${house}', road='${road}', division='${division}', zila='${zila}', upazila='${upazila}', pass='${pass}' WHERE u_id  = ${userId}`;
      const [row] = await dbConnect.promise().execute(sql)
      return row;

    } catch (err) {
      console.log(err)
      return err;
    }
  },


  /* ====== Get Data from DB ===== */


  getAdmin: async (userid) => {
    const sql = `SELECT * FROM admin WHERE admin_uid="${userid}"`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

  getRawMedicine: async (mid) => {
    const sql = `SELECT * from medicine WHERE id="${mid}"`;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows[0];
  },
  getSearchMedicine: async (mname) => {
    if (!mname) return []
    const sql = `SELECT * from shopmedicine join worker on  shop_email=email WHERE mediname like "%${mname}%" `;
    const [rows] = await dbConnect.promise().execute(sql);
    return rows;
  },

};

module.exports = UserModels;
