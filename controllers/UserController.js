const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserModels = require('../models/UserModels');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // user: 'gazi.rahad871@gmail.com',
    // pass: 'azxxmidtjvuakxgk',
    user: 'mamun872381cpi@gmail.com',
    pass: 'rftopxkjdkfjhfpc',
  },
});
//

async function sendMail(toMail, subject, textMessage, htmlMessage) {

  // send mail with defined transport object
  const results = await transporter.sendMail({
    from: 'Emerjency Medicine Finder ✉️ <mamun872381cpi@gmail.com>',
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
    const uId=localStorage.getItem("AuserData");
    const allAdmin = await UserModels.getAdmin(uId)
    console.log(uId)
    console.log({allAdmin:allAdmin})
    console.log("Object Data",{uId:uId})
    res.render('pages/admin',{uId:uId, allAdmin:allAdmin})
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
  getMedicineData: async (req, res) => {
    const allMedi = await UserModels.getMedicineData()
    console.log(allMedi)
    res.render('pages/medicinesdata',{allMedi})
  },
  getSignupForm: async (req, res) => {
    res.render('pages/signup')
  },

  getaSignupForm: async (req, res) => {
    res.render('pages/asignup')
  },


  asignupData: async (req, res) => {
    try {
      const {
        userid, pass,
      } = req.body;
      const hash = await bcrypt.hash(pass, 10);
      // console.log(req.body.email)
      const asignupd = await UserModels.adminSignup(userid, hash);

      if (asignupd.errno) {
        res.send('Something went wrong')
      } else {
        const toMail = "a.a.mamun2098@gmail.com"
        const subject = 'Emerjency Medicine Finder active account';
        const textMessage = 'Emerjency Medicine Finder account verify'
        console.log("dsfsdfsd", asignupd)
        const activeBtn = `
         <div>
         <a style="cursor: pointer;" href="http://localhost:4000/verify-account/${asignupd.insertId}">
        <button style="padding: 0px 20px;
         border-radius: 8px;
         background-color: #103047;
         border : none;
         font-size: 15px;
         font-weight: 700;
         line-height: 36px;activeBtn
         color: #FFFFFF;
         margin-left: 8px;
         text-align: center;
         cursor: pointer;">
         Active account</button></a>
         </div>
         `
        sendMail(toMail, subject, textMessage, activeBtn)
        res.redirect('/admin')
      }
    } catch (e) {
      console.log(e)
      res.send('Wrong')
    }
  },

  signupData: async (req, res) => {
    try {
      const {
        firstName, lastName, email, phone, house, road, division, upazila, zila, role, pass,
      } = req.body;
      const hash = await bcrypt.hash(pass, 10);
      // console.log(req.body.email)
      const signupd = await UserModels.signup(firstName, lastName, email, phone, house, road, division, upazila, zila, role, hash);

      if (signupd.errno) {
        res.send('Something went wrong')
      } else {
        // const toMail="dibabinte07@gmail.com"
        const subject = 'Emerjency Medicine Finder active account';
        const textMessage = 'Emerjency Medicine Finder account verify'
        const link = `${process.env.BASE_UR}`
        console.log("dsfsdfsd", signupd)
        const activeBtn = `
         <div>
         <a style="cursor: pointer;" href="http://localhost:4000/verify-account/${signupd.insertId}">
        <button style="padding: 0px 20px;
         border-radius: 8px;
         background-color: #103047;
         border : none;
         font-size: 15px;
         font-weight: 700;
         line-height: 36px;activeBtn
         color: #FFFFFF;
         margin-left: 8px;
         text-align: center;
         cursor: pointer;">
         Active account</button></a>
         </div>
         `
        // sendMail(toMail, subject, textMessage, activeBtn)
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
              localStorage.setItem(`userData`, `${userid}`);

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

  adminLoginData: async (req, res) => {
    try {
      const {
        userid, pass,
      } = req.body;

      console.log("admin login =",userid, pass);
      if (userid && pass) {
        const alogin = await UserModels.adminLogin(userid);
        console.log("test", alogin)
        if (alogin.length > 0) {
          for (let i = 0; i < alogin.length; i++) {
            const validPass = await bcrypt.compare(pass, alogin[i].pass);
            if (validPass && alogin[i].status == 1) {
              localStorage.setItem(`AuserData`, `${userid}`);
              // console.log(localStorage.removeItem("AuserData"))
              res.redirect('/admin');
              // res.render('pages/login', { title: 'Express', session: req.session, login: login })
            } else {
              res.send('Incorrect Password');
            }
          }
        } else {
          res.send('Incorrect Email Address');
        }
        res.end();
      } else {
        res.send('Please enter your email, password.')
        res.end();
      }
    } catch (e) {
      console.log(e);
      res.send('Wrong')
    }
  },

  userData: async (req, res) => {
    res.render('pages/home')
  },

  amedicineData: async (req, res) => {
    const uId=localStorage.getItem("AuserData");
    const allAdmin = await UserModels.getAdmin(uId)
    // console.log(uId)
    // console.log({allAdmin:allAdmin})
    // console.log("Object Data",{uId:uId})
    res.render('pages/addmedicineba',{uId:uId, allAdmin:allAdmin})
  },

  getlogout: (req, res) => {
    req.session.destroy();
    res.redirect('/login')
  },

  getAdminlogout: (req, res) => {
    localStorage.removeItem('AuserData');
    res.redirect('/admin')
  },

  accountVerify: async (req, res) => {
    const userId = req.params.id
    // console.log({ userId })
    const isUpdate = await UserModels.updateStatus(userId)
    if (isUpdate.affectedRows) {
      res.redirect('/login')
    }
  },

  /* == Add Medicine By Admin Controller == */

  addMedicineData: async (req, res) => {
    try {
      const {
        brandName,generics,dosgaeForm,strengthMg,company
      } = req.body;
      const servie = await UserModels.addMedicineByAdmin(brandName,generics,dosgaeForm,strengthMg,company);

      if (servie.errno) {
        res.send('Something went wrong')
      } else {
        res.redirect('/admin')
      }
    } catch (e) {
      console.log(e);
      res.send('Wrong')
    }
  },


  /* login controller */
  // loginC: async (req, res) => {
  //   try {
  //     const { email, pass } = req.body;
  //     // console.log('Body', email, pass);
  //     // error msg
  //     const errors = validationResult(req).formatWith((error) => error.msg);
  //     console.log({ errors })
  //     if (!errors.isEmpty()) {
  //       console.log("work.......", errors)
  //       return res.render('pages/login', {
  //         error: errors.mapped(),
  //         value: { email, pass },
  //       });
  //     }
  //     const user = await UserModels.mailCatchM(email);
  //     const userName = user[0].first_name;
  //     const userMail = user[0].email;
  //     const password = user[0].pass;
  //     console.log({ user })
  //     console.log("check user", user !== '')
  //     console.log(user[0].u_id !== '')


  //     if (user[0].u_id !== '') {
  //       console.log("is it work....")
  //       const isValidPassword = await bcrypt.compare(pass, password);
  //       if (isValidPassword) {
  //         console.log("pass ok", isValidPassword)

  //         const token = jwt.sign(
  //           {
  //             name: userName,
  //             mail: userMail,
  //           },
  //           process.env.JWT_SECRET,
  //           { expiresIn: maxAge },
  //         )
  //         console.log("token", token !== null)
  //         if (token !== null) {
  //           res.cookie(process.env.COOKIE_NAME, token, { maxAge, httpOnly: true, signed: true });
  //           console.log("ok token", user)

  //           res.render('pages/home', { user })
  //           // res.render('pages/login',{ title: 'Express', session: req.session })



  //           // res.redirect('/',{ user });
  //           console.log("endd................")
  //         }
  //       } else {
  //         res.render('pages/login', { auth: true });
  //       }
  //     } else {
  //       console.log("have error")
  //       res.render('pages/login', { auth: true });
  //     }
  //   } catch (err) {
  //     res.render('pages/login', {
  //       auth: true,
  //       data: {
  //         email: req.body.email,
  //       },
  //       errors: {
  //         common: {
  //           msg: err.message,
  //         },
  //       },
  //     });
  //     // console.log(errors)
  //   }
  // },


}


module.exports = UserController
