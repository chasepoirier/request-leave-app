import jwt from 'jsonwebtoken'

const generateJWT = user =>
  jwt.sign(
    {
      email: user.email,
      fname: user.fname
    },
    process.env.JWT_SECRET
  )

const toAuthJSON = user => ({
  id: user.id,
  uid: user.uid,
  email: user.email,
  fname: user.fname,
  lname: user.lname,
  admin: user.admin,
  super: user.super,
  token: generateJWT(user)
})

export default toAuthJSON
