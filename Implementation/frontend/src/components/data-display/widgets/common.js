const R = require('ramda');

const adequateToChartJS = prop => R.pipe(
  R.defaultTo([]),
  R.countBy(R.prop(prop)),
  values => ({
    labels: R.keys(values),
    datasets: [
      {
        backgroundColor: '#40a9ff',
        data: R.values(values),
      },
    ],
  }),
);

const haveTime = R.ifElse(
  R.either(R.isNil, R.isEmpty),
  R.F,
  R.pipe(
    R.head,
    R.has('time'),
  ),
);

export { haveTime, adequateToChartJS };
