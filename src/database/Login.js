const login = require('../schema/login')
const config = require("../config/config.json");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.url)
  .then(() => console.log("Conectado"))
  .catch((e) => console.log("Error ", e));

const LoginSchema = mongoose.Schema(login, {versionKey: false})
const LoginModel = mongoose.model(config.collections.login, LoginSchema, config.collections.login);
//busquedas
const GetUsuarios = async () => {
  const results = await LoginModel.find();
  return results;
};

const GetUsuario = async (datos) => {
  const query = {
    Username: datos.Username,
    Password:  datos.Password,
    Activo: true
  }
  const result = await LoginModel.findOne(query)
  console.log(result)
  return result
};

const Comprobar = async(datos) =>{
  const query = {
    Username: datos.Username, Activo: true
  }
  const result = await LoginModel.findOne(query)
  return result;
}

const CreateLogin = async (datos) =>{
  if (await Comprobar(datos) === null) {
    const query = new LoginModel({
      Username: datos.Username,
      Password: datos.Password,
      Id_Socio: datos.Id_Socio
    })
    const result = await query.save()
    console.log(result)
    return result
  }else{
    return false
  }
}

const UpdateLogin = async (id, datos) =>{
  try {
    const update = await LoginModel.updateOne({_id: id},{
      $set: datos
    })
    console.log(update)
    return update
  } catch (error) {
    console.log(error)
  }
}

const DeleteLogin = async (id)=>{
  try {
    const result = await LoginModel.deleteOne({_id: id})
  console.log(result)
  return result
  } catch (error) {
    console.log(error)
  }
}

const exp = { GetUsuarios, GetUsuario, CreateLogin, UpdateLogin, DeleteLogin };
module.exports = exp;
