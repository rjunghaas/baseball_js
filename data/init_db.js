var mongoose = require('mongoose');

var baseballSchema = mongoose.Schema({
	name: String,
	id: Number
}, {collection: 'baseballDB'});

var dbURI = 'mongodb://127.0.0.1:27017/baseballDB';
var BaseballDB = mongoose.model('baseballDB', baseballSchema, 'baseballDB');
mongoose.connect(dbURI);

var YC = new BaseballDB({name: 'Yoenis Cespedes', id: '13110'});
YC.save();

var AR = new BaseballDB({name: 'Alex Rodriguez', id: '1274'});
AR.save();

var SC = new BaseballDB({name: 'Shin-Soo Choo', id: '3174'});
SC.save();

var AP = new BaseballDB({name: 'Albert Pujols', id: '1177'});
AP.save();

var RC = new BaseballDB({name: 'Robinson Cano', id: '3269'});
RC.save();

var JV = new BaseballDB({name: 'Joey Votto', id: '4314'});
JV.save();

var PF = new BaseballDB({name: 'Prince Fielder', id: '4613'});
PF.save();

var DJ = new BaseballDB({name: 'Derek Jeter', id: '826'});
DJ.save();

var JM = new BaseballDB({name: 'Joe Mauer', id: '1857'});
JM.save();

var MT = new BaseballDB({name: 'Mark Teixeira', id: '1281'});
MT.save();

var BP = new BaseballDB({name: 'Buster Posey', id: '9166'});
BP.save();

var MK = new BaseballDB({name: 'Matt Kemp', id: '5631'});
MK.save();

var TT = new BaseballDB({name: 'Troy Tulowitzki', id: '3531'});
TT.save();

var AG = new BaseballDB({name: 'Adrian Gonzales', id: '1908'});
AG.save();

var MC = new BaseballDB({name: 'Miguel Cabrera', id: '1744'});
MC.save();

var JE = new BaseballDB({name: 'Jacoby Ellsbury', id: '4727'});
JE.save();

var CC = new BaseballDB({name: 'Carl Crawford', id: '1201'});
CC.save();

var DW = new BaseballDB({name: 'David Wright', id: '3787'});
DW.save();

var AS = new BaseballDB({name: 'Alfonso Soriano', id: '847'});
AS.save();

var VW = new BaseballDB({name: 'Vernon Wells', id: '1326'});
VW.save();

var JW = new BaseballDB({name: 'Jayson Werth', id: '1327'});
JW.save();

var RZ = new BaseballDB({name: 'Ryan Zimmerman', id: '4220'});
RZ.save();

var JH = new BaseballDB({name: 'Josh Hamilton', id: '1875'});
JH.save();

var RH = new BaseballDB({name: 'Ryan Howard', id: '2154'});
RH.save();

var JG = new BaseballDB({name: 'Jason Giambi', id: '818'});
JG.save();

var MH = new BaseballDB({name: 'Matt Holliday', id: '1873'});
MH.save();

var EA = new BaseballDB({name: 'Elvis Andrus', id: '8709'});
EA.save();

var CB = new BaseballDB({name: 'Carlos Beltran', id: '589'});
CB.save();

var DO = new BaseballDB({name: 'David Ortiz', id: '745'});
DO.save();

var DP = new BaseballDB({name: 'Dustin Pedroia', id: '8370'});
DP.save();

var JR = new BaseballDB({name: 'Jose Reyes', id: '1736'});
JR.save();

var RB = new BaseballDB({name: 'Ryan Braun', id: '3410'});
RB.save();

var EL = new BaseballDB({name: 'Evan Longoria', id: '9368'});
EL.save();

var CL = new BaseballDB({name: 'Carlos Lee', id: '243'});
CL.save();

var AE = new BaseballDB({name: 'Andre Ethier', id: '6265'});
AE.save();

console.log("Done!");
return;