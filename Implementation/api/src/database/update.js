import R from 'ramda';
import { knex } from './init';
import { PERMISSIONS } from './names';
import { filterByUser } from './common'

async function updatePermissionStatus(permissionID, userID){
    let operation = R.pipe(
        filterByPermissionID(permissionID),
        filterByUser(userID),
        setAccepted(true)
    )

    return operation(knex(PERMISSIONS));
}

export { updatePermissionStatus }

// HELPERS

const filterByPermissionID = R.curry((permissionID, query) => {
    query.where(`${PERMISSIONS}.id`, permissionID);
    return query;
});



const setAccepted = R.curry((accepted, query) => {
    query.update({
        accepted
    })
    return query;
});
