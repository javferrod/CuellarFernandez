import inside from 'point-in-polygon';
import R from 'ramda';

/*
* This package should be replaced by SQL statements.
* Postgres have the capability of performing Geographical search 
* thanks to PostGIS extension. However, if we want to install
* it, a docker image build from the ground would be needed and 
* we lack the time to do that. 
*/


//If the user have any location inside the polygon, is included. 
const filterGroupedResulByLocation = (parameters, groupedResul) => R.filter( 
    R.pipe(
        filterByLocation(parameters), 
        R.isEmpty,
        R.not
    )
)(groupedResul)

/*
* Unless nil, includes only the locations 
* inside of the polygon given by parametrs
*/
const filterByLocation = R.curry((parameters, entries) => R.unless(
    _ => R.isNil(parameters.location),
    R.filter(isInsideOf(parameters))
)(entries));

const isInsideOf = R.curry((parameters, entry) => R.ifElse(
    R.pipe(R.head, R.isNil), //If the latitude is nil, return false
    R.F,
    point => inside(point, getPolygon(parameters))
)([entry.latitude, entry.longitude]));

const getPolygon = R.pipe(
    R.prop('location'),
    R.map(R.values)
)

export { filterGroupedResulByLocation }
