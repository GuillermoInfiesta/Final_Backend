export const getPaisPorTlf = async(telefono: string) => {
    const BASE_URL = "https://api.api-ninjas.com/v1/validatephone?number=";
    const url = `${BASE_URL}${telefono}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'ajtO/l2V2aAqiwhtyZmYKA==UbNw8rnXMdAAg0oT',
            'contentType': 'application/json'
        }
    })

    if(response.status !== 200) throw new Error(`Error al realizar la query para validar telefono`)
    const data = await response.json();
    if(data.is_valid === false) throw new Error(`El telefono introducido no es válido`)
    return data.country;

}