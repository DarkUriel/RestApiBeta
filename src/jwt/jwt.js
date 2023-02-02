const jwt = require("jsonwebtoken");
const Login = require('../database/Login')
const config = require('../config/config.json')
const llave = config.llave

function GenerateAccessToken(user) {
  return jwt.sign({ user }, llave, { expiresIn: 60 * 60 });
}

async function VerifyToken(token) {
  try {
    const decode = jwt.verify(token, llave)
    console.log(decode.user)
    if (await Login.GetUsuario(decode.user) !== null) {
      const datos = {
        token: GenerateAccessToken(decode.user),
        user: decode.user
      }
      return (datos)
    }else{
      return(false)
    }
  } catch (error) {
    return(false)
  }
}

const funciones = { GenerateAccessToken, VerifyToken };

module.exports = funciones;
