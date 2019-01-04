import { connectToDatabase } from './init';
import { saveParameters, saveUser, saveClient, savePermission } from './insert';
import { searchByID, searchByCodice, searchByParameters, getPermissions, getID, havePermission, retrieveUserPermissions } from './search';
import { updatePermissionStatus } from './update';

export { 
    connectToDatabase, saveParameters, saveUser, saveClient, searchByID, searchByCodice, searchByParameters,
    getPermissions, getID, savePermission, havePermission, updatePermissionStatus, retrieveUserPermissions
};