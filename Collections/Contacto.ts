import mongoose from "npm:mongoose@7.6.3"
import { getPaisPorTlf } from "../resolvers/GetPaisPorTlf.ts";

const Schema = mongoose.Schema;

const ContactoSchema = new Schema({
    nombre: {type: String, required: true, lowercase: true, unique: true},
    telefono: {type: String, required: true, unique: true},
    pais: {type: String, required: true}
})


//Añadir validates con expReg para los campos si eso

ContactoSchema.pre("save", async function() {
    const exists = await ContactoModel.findOne({nombre: this.nombre/*, apellido1: this.apellido1, apellido2: this.apellido2*/}).exec();
    if(exists) throw new Error(`Ya existe una persona con ese nombre y apellidos`);
})

ContactoSchema.pre("findOneAndUpdate", async function () {
    const id = this.getFilter()["_id"]
    const telefono = this.getUpdate()["telefono"]; 
    if(id === undefined || id === null) throw new Error //Lo pongo por que no salga en rojo, pero no se va a dar el caso de entrar aqui y que fuera null o undefined
    if(telefono !== null && telefono !== undefined){ //En caso de que en la update nos venga un telefono
        const exists = await ContactoModel.findOne({telefono: telefono}).exec();
        if(exists){
            if(exists._id.toString() !== id) throw new Error(`Ya hay una persona con este numero de telefono`) //Si una persona que no somos nosotros ya lo tiene
            return //Si lo tenemos nosotros
        }
        
        const pais = await getPaisPorTlf(telefono); //Cogemos el nuevo pais
        await ContactoModel.updateOne({_id: id}, {pais: pais}).exec(); //Actualizamos el pais tambien
    }
})
export type ContactoModelType = {
    nombre: string,
    telefono: string,
    pais: string,
    _id: mongoose.Types.ObjectId
}

export const ContactoModel = mongoose.model<ContactoModelType>(
    "Contactos",
    ContactoSchema
)