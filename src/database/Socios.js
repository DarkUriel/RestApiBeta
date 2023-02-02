const Socios = require('../schema/socios')
const config = require('../config/config.json')
const mongoose = require('mongoose')

//Conexion
mongoose.set("strictQuery", false);

mongoose
  .connect(config.url)
  .then(() => console.log("Conectado"))
  .catch((e) => console.log("Error ", e));

const SociosSchema = mongoose.Schema(Socios, {versionKey: false})
const SociosModel = mongoose.model(config.collections.socios, SociosSchema, config.collections.socios)

//Funciones
const Comprobar = async(datos) =>{
    const query = {
      Interno: datos.Interno
    }
    const result = await SociosModel.findOne(query)
    return result;
  }

const  CreateSocio = async(datos)=>{
    if ((await Comprobar(datos)) === null) {
      const query = {
        "Nombre": datos.Nombre,
        "Apellidos": datos.Apellidos,
        "CI": datos.CI,
        "Telefono": datos.Telefono,
        "Direccion": datos.Direccion,
        "Interno": datos.Interno,
        "TieneChofer": datos.TieneChofer,
        "Activo": datos.Activo
      };
      const result = await query.save()
      console.log(result)
      return result
    }else{
        return false
    }
}

const GetSocios = async()=>{
    const results = await SociosModel.find()
    return results
}

const GetSocio = async(datos)=>{
    const query = {
        "Interno":  datos.Interno
    }
    const result = await SociosModel.findOne(query)
    return result;
}

const UpdateSocio = async(id, datos)=>{
    try {
        const update = await SociosModel.updateOne({_id: id},{
            $set: datos
        })
        console.log(update)
        return update
    } catch (error) {
        console.log(error)
    }
}

const DeleteSocio = async(id)=>{
    try {
        const result = await SociosModel.deleteOne({_id: id})
        console.log(result)
        return result
    } catch (error) {
        console.log(result)
    }
}

const exp = { GetSocios, CreateSocio, GetSocio, UpdateSocio, DeleteSocio }

module.exports = exp