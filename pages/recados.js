/* import {SiteClient} from 'datocms-client';
import { Recado } from '../../src/services/models';

const API_TOKEN = '118823ccb9166ae2c2d8a7bde5efa3';
const client = new SiteClient(API_TOKEN);
const DATO_MODEL_ID = '990185';

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