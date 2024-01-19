import { ContactoModelType, ContactoModel } from '../Collections/Contacto.ts';

export const Query = {
    getContact: async(_: unknown, args: {id: string}): Promise<ContactoModelType> => {
        const {id} = args;
        const contact = await ContactoModel.findById(id).exec();
        if(!contact) throw new Error(`No se ha encontrado el contacto`);
        return contact;
    },
    getContacts: async(): Promise<ContactoModelType[]> => {
        const contacts = await ContactoModel.find().exec();
        return contacts;
    }
}