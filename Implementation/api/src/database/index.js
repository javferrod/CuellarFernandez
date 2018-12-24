import { connectToDatabase } from './init';
import { saveParameters, saveUser, saveClient } from './insert';
import { searchByID, searchByCodice, searchByParameters } from './search';


export { connectToDatabase, saveParameters, saveUser, saveClient, searchByID, searchByCodice, searchByParameters };