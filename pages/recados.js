/*import {SiteClient} from 'datocms-client';
import { Recado } from '../../src/services/models';

const API_TOKEN = '0c10482072a744d472aac2fa9ceab3';
const client = new SiteClient(API_TOKEN);
const DATO_MODEL_ID = '1002596';

client.items.create({
  itemType: "1002596",
})

export default async function receiveRequest(req, res){
  if(req.method === 'POST'){
    const recadoDto = new Recado();
    
    recadoDto.itemType = DATO_MODEL_ID;
    recadoDto.from = req.body.recado.from;
    recadoDto.message = req.body.recado.message;

    const response = await client.items.create(recadoDto);

    res.json(response)
  }
  else{
    res.status(404).json({
      message: 'Method not implemented'
    })
  }

  
  
} */