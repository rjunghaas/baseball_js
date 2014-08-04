var cheerio = require('cheerio');
exports.version = '0.0.1';

exports.parseDate = function(date_str) {
	var date_parse = date_str.split("/");
	var return_date = date_parse[0] + "%2F" + date_parse[1] + "%2F" + date_parse[2];
	return return_date;
}

exports.parsePage = function(html) {
	var result =[];
	$ = cheerio.load(html);
	
	$('.toprow', '.dbd').each(function (i, row){
		totalRow = $(row).html();
		if($(totalRow).first().text() == "Totals"){
			games = parseInt($(totalRow).slice(1,2).text());
			ab = parseInt($(totalRow).slice(3,4).text());
			runs = parseInt($(totalRow).slice(4,5).text());
			hits = parseInt($(totalRow).slice(5,6).text());
			dbl = parseInt($(totalRow).slice(6,7).text());
			tpl = parseInt($(totalRow).slice(7,8).text());
			hr = parseInt($(totalRow).slice(8,9).text());
			rbi = parseInt($(totalRow).slice(9,10).text());
			bb = parseInt($(totalRow).slice(10,11).text());
			hbp = parseInt($(totalRow).slice(12,13).text());
			cs = parseInt($(totalRow).slice(15,16).text());
			sh = parseInt($(totalRow).slice(16,17).text());
			sf = parseInt($(totalRow).slice(17,18).text());
			gdp = parseInt($(totalRow).slice(18,19).text());
			result = [games, ab, runs, hits, dbl, tpl, hr, rbi, bb, hbp, cs, sh, sf, gdp];
			}
		});
		
	summaryTable = $('.dbd').last();
	summaryRow = $(summaryTable).children().last();
	ba = parseFloat($(summaryRow).slice(0,1).text());
	oba = parseFloat($(summaryRow).children().slice(1,2).text());
	slg = parseFloat($(summaryRow).children().slice(2,3).text());
	ops = oba + slg;
	result.push(ba, oba, slg, ops);
	
	return result;
}

exports.calcVorp = function(statsArray) {
	//constants
	lgBA = 0.253;
	lgOBP = 0.317;
	lgSLG = 0.396;
	lgRunsPerOut = 0.1633;
	replaceR = 0.8;
		
	replaceRadical = (25 * lgOBP * lgSLG) / (1 - lgBA);
	replaceRoot = Math.pow(replaceRadical,(1/3.0));
	replaceP = (0.1073-(0.11 * replaceR)) * replaceRoot;
		
	ab = statsArray[1];
	hits = statsArray[3];
	cs = statsArray[10];
	sh = statsArray[11];
	sf = statsArray[12];
	gdp = statsArray[13];
		
	totalOuts = ab - hits + cs + sh + sf + gdp;
	totalSeasons = (parseFloat(statsArray[0])) / 162;
	adjustedOuts = (totalOuts / totalSeasons);
	runsProduced = (lgRunsPerOut * adjustedOuts);
		
	replaceRunsProduced = (replaceR * runsProduced);
		
	walks = statsArray[8];
	hbp = statsArray[9];
	doubles = statsArray[4];
	triples = statsArray[5];
	homeRuns = statsArray[6];
		
	totalBases = hits + doubles + (2 * triples) + (3 * homeRuns) + walks + hbp;
	runsCreated = ((hits + walks) * totalBases) / (ab + walks);
	adjustedRunsCreated = (runsCreated / totalSeasons);
		
	vorp = (adjustedRunsCreated - replaceRunsProduced);
		
	return vorp.toFixed(2);
}

