// The live dashboard's "Inflation Trend" chart (https://global-inflation-analysis.onrender.com),
// default view: United States, 2014–2024. Values are read from the dashboard's own Plotly figures
// (World Bank CPI inflation, annual %; the moving average is the dashboard's trailing 3-year mean).

export const INFLATION: ReadonlyArray<readonly [number, number]> = [
  [2014, 1.62], [2015, 0.12], [2016, 1.26], [2017, 2.13], [2018, 2.44], [2019, 1.81], [2020, 1.23], [2021, 4.7], [2022, 8.0], [2023, 4.12], [2024, 2.95],
];

export const MOVING_AVG: ReadonlyArray<readonly [number, number]> = [
  [2014, 1.72], [2015, 1.07], [2016, 1.0], [2017, 1.17], [2018, 1.94], [2019, 2.13], [2020, 1.83], [2021, 2.58], [2022, 4.64], [2023, 5.61], [2024, 5.02],
];

/** The year the dashboard's z-score detector flags as an anomaly in this view. */
export const ANOMALY_YEAR = 2022;
