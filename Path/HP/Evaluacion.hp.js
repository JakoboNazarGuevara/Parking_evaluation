/*this imports my functions from './../Tool/datauto' to be used in this file.*/
const Tools = require('./../Tool/datauto');

/*array and matrix of data to be evaluated by the program 7 cases each*/
var Tparkeo =["Valet","Short","Economy","Long-Garage","Long-Surface"];
var Sdate =["2","3","4","5","6","9","17"];
var Ldate =["2","3","4","5","8","16","26"];
var Dmsg =["0","0","0","0","2","7","9"];
var Hmsg =["0","2","6","7","0","0","0"];
var Mmsg =["40","0","0","30","0","0","0"];
var Stime =["08:00","09:00","07:00","07:00","07:00","07:00","07:00"];
var Ltime =["08:40","11:00","01:00","02:30","07:00","07:00","07:00"];
var SAMPM =["AM","AM","AM","AM","AM","AM","AM"];
var LAMPM =["AM","AM","PM","PM","AM","AM","AM"];
var Total =[
    ["12.00","12.00","18.00","18.00","36.00","126.00","162.00"],
    ["2.00","4.00","12.00","15.00","48.00","168.00","216.00"],
    ["2.00","4.00","9.00","9.00","18.00","54.00","72.00"],
    ["2.00","4.00","12.00","12.00","24.00","72.00","96.00"],
    ["2.00","4.00","10.00","10.00","20.00","60.00","80.00"]
];
var Month =["January","February","March","April","May","Jun","July","August","September","October","November","December"];
var MonthS = 8;
var Year = 2020;
var ci= 0;
var h=0;
var TparkeoL = Tparkeo.length;
var SdateL = Sdate.length;

/*this for is meant to loop betwen the diferent tipe of Parking
to evaluate:
Valet Parking = set i=0;i<1
short term = set i=1;i<2
Economy = set i=2;i<3
long-term Garage = set i=3;i<4
long-term surface = set i=4;i<5
all =
*/
for(i=0;i<5;){
    let ci=i

/*this for is meant to loop betwen the diferent cases given
to evaluate
case 1 = set hi=0;hi<1
case 2 = set hi=1;hi<2
case 3 = set hi=2;hi<3
case 4 = set hi=3;hi<4
case 5 = set hi=4;hi<5
case 6 = set hi=5;hi<6
case 7 = set hi=6;hi<7
all = set hi=0;hi<7
*/
for(hi=0;hi<7;){
    let h=hi;


describe('Evaluating: '+Tparkeo[ci]+' Case :'+hi+' ',()=>{
/*Go to shino parking calculator*/
    it('Open browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
        browser.pause(2000);
    });

    it('Set and check Parking tipe to "'+Tparkeo[ci]+' Parking"',()=>{
        $("select#ParkingLot").selectByIndex(ci);
        const $parking = browser.$('select[id="ParkingLot"]');
        expect($parking).toHaveValue(Tparkeo[ci]);
    });
/*call ESetDate() to feed the form with information from Array*/
    Tools.ESetDate(Sdate[h],Ldate[h],MonthS,Stime[h],Ltime[h],SAMPM[h],LAMPM[h]);
/**/
    it('Click on calculate bottom: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
/*call ECheckDate() to veriry nformation in form is correct*/
    Tools.ECheckDate(((MonthS+1)+'/'+Sdate[h]+'/'+Year),((MonthS+1)+'/'+Sdate[h]+'/'+Year),Stime[h],Ltime[h],SAMPM[h],LAMPM[h],Total[ci][h],Dmsg[h],Hmsg[h],Mmsg[h]);

});
/*case counter +1*/
hi++;
}
/*Parkng tipe counter +1*/
i++;
}
