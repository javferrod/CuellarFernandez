import Router from 'koa-router';
import { getPermissions, getID, updatePermissionStatus, retrieveUserPermissions } from '../database';
import { savePermission } from '../database';
import R from 'ramda';

var permissionManager = new Router({ prefix: '/permissions' });

permissionManager.post('/', async (ctx, next) => {
    const { id } = ctx.request.body;

    ctx.response.body = await getPermissions(id);
})

permissionManager.post('/client', async (ctx, next) => {
    const { id } = ctx.request.body;

    ctx.response.body = await retrieveUserPermissions(id);
})

permissionManager.post('/request', async (ctx, next) => {
    const { id, codice } = ctx.request.body;
    
    let user = await getID(codice);

    if(R.isEmpty(user)){
        ctx.response.status = 400;
        return;
    }

    let permissionID = await savePermission(id, user[0].id);

    if(R.isNil(permissionID))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
})

permissionManager.post('/accept', async (ctx, next) => {
    const { permissionID, userID }  = ctx.request.body;

    let id = await updatePermissionStatus(permissionID, userID)

    if(id)
        ctx.response.status = 200;
    else
        ctx.response.status = 400;
})

export default permissionManager;