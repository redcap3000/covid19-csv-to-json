# covid19-csv-to-json
Converts csv data from covid19 data to json.

## Basic Use ##

`npm install`
`node index.js`

Will convert files in output files to the root directory of the repo, will overwrite if exists.

COVID Data is a git submodule of

https://github.com/CSSEGISandData/COVID-19

covid-19-data is a git submodule of

https://github.com/nytimes/covid-19-data.git


## Musings on what to do ##

Normalize data per jursdiction/ city/state etc. But ultimately use to create an algorithm to assign specific resources based on a ratio of infected to dead and the rate of acceleration.

Potiential assignable federal resources, ventilators (high infection rates), PPE (spread across low infection rate/ and high infection rates in a bellcurve fashion), national guard, testing supplies for jursdictions with low infection rates.
specialized medical personnel

Make major weight adjustments based on a specific jursdictions plan and/or daily data.

Compare datasets for inconsistencies, create a 'transformations' file to fix them without modifying the originating repository data (they are overwhelmed)