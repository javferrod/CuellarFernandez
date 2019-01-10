import inside from 'point-in-polygon';
import R from 'ramda';

function test(){
    let prueba = {
        '0': [{ id: 1,
     latitude: 40.344748,
     longitude: -3.538364,
     gender: 'M',
    
    },
    { id: 1,
     latitude: 0.344748,
     longitude: -0.538364,
     gender: 'M',
    
    }
    ],

        '1': [
    { id: 1,
     latitude: 0.344748,
     longitude: -0.538364,
     gender: 'M',
    
    }
    ],
        }

     let parameters = {
         location: [
             {lat: 44.18220395771566, lng: -9.673787077142782},
{lat: 44.213709909702054, lng: 5.93486724369976},
{lat: 38.993572058209466, lng: 6.286611566422957},
{lat: 34.08906131584996, lng: -6.332216011272266},
{lat: 34.70549341022547, lng: -13.14726226403451}
         ]}
         console.log(getPolygon(parameters));
         console.log(filterGroupedResulByLocation(parameters, prueba));

}

const filterGroupedResulByLocation = (parameters, groupedResul) => R.filter(R.pipe(
    filterByLocation(parameters),
    R.isEmpty,
    R.not
))(groupedResul)

const filterByLocation = R.curry((parameters, entries) => R.unless(
    _ => R.isNil(parameters.location),
    R.filter(isInsideOf(parameters))
)(entries));

const isInsideOf = R.curry((parameters, entry) => R.ifElse(
    R.pipe(R.head, R.isNil),
    R.F,
    point => inside(point, getPolygon(parameters))
)([entry.latitude, entry.longitude]));

const getPolygon = R.pipe(
    R.prop('location'),
    R.map(R.values)
)

export { test, filterGroupedResulByLocation }
