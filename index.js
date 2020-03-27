

/*
	Reads a file path (COVID-19/csse_covid_19_data/csse_covid_19_daily_reports)

	opens each csv file, parses then saves to root of repo.

	Includes the COVID-19 repo as a sub module.

	Ronaldo Barbachano 2020
*/
csv = require('csv-parse')
fs = require('fs')
covidPath = 'COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/'
covidPath2 = 'covid-19-data/'


function dirCSVtoJSON(err,items,path){
	for (var i=0; i<items.length; i++) {
	    	// filename check
	    	if(items[i].split('.')[1] == 'csv'){
				let cvsFile = fs.readFileSync(path +items[i]);
				if(cvsFile){
					resultObjects = []
					cvsFile = cvsFile.toString()
					keys = []
					stats = []
					errorObjects = []
					if(typeof cvsFile != 'undefined'){
						cvsFile.toString().split('\n').filter(function(o,x){
							if(x === 0){
								let row = o.split(',')
								keys = row
								keys.pop()
							}else{
								let row = o.split(',')
								let obj = {}
								row.filter(function(value,order){
									// filter out articles without a location
									if(value != '' && typeof keys[order] != 'undefined'){
											if(keys[order] == 'Confirmed' || keys[order] == 'Deaths' || keys[order] == 'Recovered'){
												// parse number
												let numCheck = parseInt(value.trim())
												obj[keys[order]] = (numCheck ? numCheck : value.trim())
											}else if(keys[order] == 'Province/State' || keys[order] == 'Country/Region'){
												obj[keys[order]] = value.trim()
											}else{
												// uncaught
												obj[keys[order]] = value.trim()
											}
									}else{
										//console.log('no value')
									}
								})
								if( typeof items[i] != 'undefined'){
									resultObjects.push(obj)
								}
							}
						})
						if(resultObjects.length > 0){
							fs.writeFile('./'+items[i]+'_parsed.json', JSON.stringify(resultObjects, null, 2) , 'utf-8',function(){
								return true
							});
						}
					}
				}
			}
		}
}
try{
	fs.readdir(covidPath, function(err,items){
		dirCSVtoJSON(err,items,covidPath)
	})
}catch(err){
	console.log(err)
	console.log("Problem with file " + covidPath)
}
try{
	fs.readdir(covidPath2, function(err,items){
		dirCSVtoJSON(err,items,covidPath2)
	})
}catch(err){
	console.log(err)
	console.log("Problem with file " + covidPath2)
}
