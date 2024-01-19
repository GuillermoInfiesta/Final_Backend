import { ContactoModel, ContactoModelType } from "../Collections/Contacto.ts"
import { getPaisPorTlf } from '../resolvers/GetPaisPorTlf.ts';

export const Mutation = {
    addContact: async(_: unknown, args: {nombre: string, telefono: string}): Promise<ContactoModelType> => {
        const {nombre, telefono} = args;
        const pais = await getPaisPorTlf(telefono);
        const contacto = await ContactoModel.create({nombre, telefono, pais});
        return contacto;
    },
    updateContact: async(_: unknown, args: {id: string, nombre: string, telefono: string}): Promise<ContactoModelType> => {
        const {id, nombre, telefono} = args;

        const updated = await ContactoModel.findOneAndUpdate({_id: id},
            {nombre: nombre, telefono: telefono},
            {new: true}).exec();
        if(!updated) throw new Error(`No se ha encontrado el contacto a actualizar`);
        return updated;
        
    },
    deleteContact: async(_: unknown, args: {id: string}): Promise<boolean> => {
        const {id} = args;
        const deleted = await ContactoModel.findByIdAndDelete(id).exec();
        
        if(!deleted) return false
        return true 
    }
}