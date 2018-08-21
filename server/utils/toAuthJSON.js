import jwt from 'jsonwebtoken'

const generateJWT = user =>
  jwt.sign(
    {
      email: user.email,
      fname: user.name.fname
    },
    process.env.JWT_SECRET
  )

const toAuthJSON = user => ({
  id: user.id,
  uid: user.uid,
  email: user.email,
  name: user.name,
  status: user.status,
  team: user.team,
  token: generateJWT(user)
})

export default toAuthJSON
