import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

        if(request.method === 'POST') {

            const TOKEN = 'ec199f7e8a2a1d9828978bf1f4c385 ';
            const client = new SiteClient(TOKEN);

            const registroCriado = await client.items.create({
                    itemType: "972364", //ID do Model de "Comunidade" criado pelo Dato
                    ...request.body,
                    /* title: "Comunidade de teste",
                    imageUrl: "https://github.com/kawan02.png",
                    creatorslug: "kawanmessias" */
        })

            console.log(registroCriado);

            console.log(TOKEN);
            response.json({
                dados:'Algum dado qualquer',
                registroCriado: registroCriado,
        })
        
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}