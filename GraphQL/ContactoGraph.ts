import { ContactoModelType } from '../Collections/Contacto.ts';


export const Contacto = {
    hora: async(parent: ContactoModelType): Promise<String> => {
        
        const urlDataPais = `https://api.api-ninjas.com/v1/country?name=${parent.pais}`;
        const responseDataPais = await fetch(urlDataPais, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'ajtO/l2V2aAqiwhtyZmYKA==UbNw8rnXMdAAg0oT',
                'contentType': 'application/json'
            }
        })
        if(responseDataPais.status !== 200) throw new Error(`Error al hacer query para los datos del pais`)
        const dataPais = await responseDataPais.json();

        const urlHora = `https://api.api-ninjas.com/v1/worldtime?city=${dataPais[0].capital}`;
        const responseHora = await fetch(urlHora, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'ajtO/l2V2aAqiwhtyZmYKA==UbNw8rnXMdAAg0oT',
                'contentType': 'application/json'
            }
        })
        if(responseDataPais.status !== 200) throw new Error(`Error al hacer query para la hora de la capital`)
        const dataHora = await responseHora.json();

        return dataHora.datetime;
    }
}