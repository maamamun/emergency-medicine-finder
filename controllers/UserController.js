const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserModels = require('../models/UserModels');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'gazi.rahad871@gmail.com',
    pass: 'azxxmidtjvuakxgk',
  },
});
//

async function sendMail(toMail, subject, textMessage, htmlMessage) {
  // send mail with defined transport object
  const results = await transporter.sendMail({
    from: 'EMF ✉️ <gazi.rahad871@gmail.com>',
    to: toMail,
    subject,
    text: textMessage,
    html: htmlMessage,
  })
  return results
}
const UserController = {

  // home

  getHome: async (req, res) => {
    res.render('pages/home')
  },

  getAdmin: async (req, res) => {
    res.render('pages/admin')
  },
  getShopkeeper: async (req, res) => {
    res.render('pages/shopkeeper')
  },
  getAddMedicine: async (req, res) => {
    res.render('pages/addmedicine')
  },
  getUpdateMedicine: async (req, res) => {
    res.render('pages/updatemedicine')
  },
  getMedicine: async (req, res) => {
    res.render('pages/medicines')
  },
  getSignupForm: async (req, res) => {
    res.render('pages/signup')
  },

  signupData: async (req, res) => {
    try {
      const {
        firstName, lastName, email, phone, house, road, division, upazila, zila, role, pass,
      } = req.body;
      const hash = await bcrypt.hash(pass, 10);
      // console.log(req.body.email)
      const signup = await UserModels.signup(firstName, lastName, email, phone, house, road, division, upazila, zila, role, hash);

      if (signup.errno) {
        res.send('Something went wrong')
      } else {
        const subject = 'EMF active account';
        const textMessage = 'EMF account verify'
        const link = `${process.env.BASE_UR}`
        const activeBtn = `
         <div>
         <a style="cursor: pointer;" href="http://localhost:4000/verify-account/${signup.insertId}">
        <button style="padding: 0px 20px;
         border-radius: 8px;
         background-color: #103047;
         border : none;
         font-size: 15px;
         font-weight: 700;
         line-height: 36px;
         color: #FFFFFF;
         margin-left: 8px;
         text-align: center;
         cursor: pointer;">
         Active account</button></a>
         </div>
         `
        sendMail(email, subject, textMessage, activeBtn)
        res.redirect('/login')
      }
    } catch (e) {
      // console.log(e);
      res.send('Wrong')
    }
  },

  getloginForm: async (req, res) => {
    res.render('pages/login', { title: 'Express', session: req.session })
  },
  loginData: async (req, res) => {
    try {
      const {
        email, role, pass,
      } = req.body;

      if (email && pass && role) {
        const login = await UserModels.login(email);
        if (login.length > 0) {
          for (let i = 0; i < login.length; i++) {
            const validPass = await bcrypt.compare(pass, login[i].pass);
            if (validPass && login[i].role == role) {
              req.session.u_id = login[i].u_id;
              req.session.first_name = login[i].first_name;
              req.session.last_name = login[i].last_name;
              req.session.role = login[i].role;
              // console.log("test", login)
              res.redirect('/login');
              // res.render('pages/login', { title: 'Express', session: req.session, login: login })
              // console.log({login:login})
            } else {
              res.send('Incorrect Password');
            }
          }
        } else {
          res.send('Incorrect Email Address');
        }
        res.end();
      } else {
        res.send('Please enter your email, password and role, If you have no account please sign up.')
        res.end();
      }
    } catch (e) {
      // console.log(e);
      res.send('Wrong')
    }
  },

  userData: async (req, res) => {
    res.render('pages/home')
  },

  getlogout: (req, res) => {
    req.session.destroy();
    res.redirect('/login')
  },
  accountVerify: async (req, res) => {
    const userId = req.params.id
    console.log({ userId })
    const isUpdate = await UserModels.updateStatus(userId)
    if (isUpdate.affectedRows) {
      res.redirect('/login')
    }
  },

}
module.exports = UserController
