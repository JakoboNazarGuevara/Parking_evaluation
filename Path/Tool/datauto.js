
module.exports={

/*Looks for the warning elements to show:
1. mktime warning message, 2.gmmktime warning message and 3. Error message in Total box
in case a field s not needed replace value with: null eje:Warnings(null,null,ErroMsg)*/
Warnings : function Warnings(mktime,gmmktime,ErroMsg){
        if(mktime!=null){
        it('Expect warning "mktime" to be displayed',()=>{
            const $Wmsg = $('body*=mktime()');
            expect($Wmsg).toBeDisplayed();
        });
        };
        if(gmmktime!=null){
        it('expect warning "gmmktime" to be displayed',()=>{
            const $Wmsg = $('body*=gmmktime()');
            expect($Wmsg).toBeDisplayed();
        });
        };
        if(ErroMsg!=null){
        it('expect total to have ERROR message Displayed',()=>{
            const $Error = $('td[class=SubHead]');
            expect($Error).toHaveTextContaining('ERROR');
        });
        };
    },

/*sets information needed in the app. 
Sday=Entry day number in calendar, Lday=leaving day numbe in calendar, Month= Month numbe in calendar -1, 0=January, 11=December,
Stime= Entry time "09:00", Ltime= Leaving time "10:30", SAMPM= Entry "AM"or"PM" time, LAMPM= Leaving "AM"or"PM" time.
in case a field s not needed replace value with: null eje:ESetDate(Sday,Lday,Month,Stime,Ltime,null,null)*/
ESetDate : function ESetDate(Sday,Lday,Month,Stime,Ltime,SAMPM,LAMPM){
        var Imonth=["January","February","March","April","May","Jun","July","August","September","October","November","December"];
        
        if(Sday!=null){
        it('Click on enter Entry date Calendar palette',()=>{
            const $callendar = $('a[href*=StartingDate]');
            $callendar.click();
        });
        
        it('Window should change to "Pick a Date"',()=>{
            browser.switchWindow('Pick a Date');
            expect(browser).toHaveTitle('Pick a Date');
        });
    
        if(Month!=null){
        it('Select '+Month+'on month',()=>{
            $("select[name=MonthSelector]").selectByIndex((Month));
            browser.pause(1000);
            const $mes = $('b*='+Imonth[(Month)]+'');
            expect($mes).toHaveText(''+Imonth[(Month)]+' 2020');
        });
        };
        it('Click on Entry date '+Sday+'',()=>{
            const $dia=$('a='+Sday+'');
            $dia.click();
        });
        it('Window should change to "Parking Cost Calculator"',()=>{
            browser.switchWindow('Parking Cost Calculator');
            expect(browser).toHaveTitle('Parking Cost Calculator');
        });
        };
    
        if(Stime!=null){
        it('Set and Check Entry Time value to '+Stime+'', () => {
            const $Stime = $('#startingTime');
            $Stime.setValue(Stime);
            expect($Stime).toHaveValue(Stime);
        });
        };
        if(SAMPM!=null){
        it('Click and Check Entry time "'+SAMPM+'" bottom', () => {
            $("input[name=StartingTimeAMPM][value="+SAMPM+"]").click(); 
            const $AMPM = $('input[name=StartingTimeAMPM]:checked');
            expect($AMPM).toHaveValue(SAMPM);
        });
        };
        if(Lday!=null){
        it('Click on enter leaving date Calendar palette',()=>{
            const $callendar = $('a[href*=LeavingDate]');
            $callendar.click();
        });
        it('Window should change to "Pick a Date"',()=>{
            browser.switchWindow('Pick a Date');
            expect(browser).toHaveTitle('Pick a Date');
        });
        if (Month!=null){
        it('Select December on month',()=>{
            $("select[name=MonthSelector]").selectByIndex((Month));
            browser.pause(1000);
            const $mes = $('b*='+Imonth[(Month)]+'');
            expect($mes).toHaveText(''+Imonth[(Month)]+' 2020');
        });
        };
        it('Click on leaving day '+Lday+'',()=>{
            const $dia=$('a='+Lday+'');
            $dia.click();
        });
        it('Window should change to "Parking Cost Calculator"',()=>{
            browser.switchWindow('Parking Cost Calculator');
            expect(browser).toHaveTitle('Parking Cost Calculator');
        });
        };
        if(Ltime!=null){
        it('Set and Check Leaving value Time to '+Ltime+'', () => {
            const $Ltime = $('#leavingTime');
            $Ltime.setValue(Ltime);
            expect($Ltime).toHaveValue(Ltime);
        });
        };
        if(LAMPM!=null){
        it('Click and Check Leaving "'+LAMPM+'" bottom', () => {
            $("input[name=LeavingTimeAMPM][value="+LAMPM+"]").click(); 
            const $AMPM = $('input[name=LeavingTimeAMPM]:checked');
            expect($AMPM).toHaveValue(LAMPM);
        });
        };
    },

/*Check if the infomrmation n the form is correct.
Sdate=Entry date MM/DD/YYYY, Ldate= Leaving date MM/DD/YYYY, Stime= Entry time "09:00", Ltime= Leaving time "10:30", 
SAMPM= Entry "AM"or"PM" time, LAMPM= Leaving "AM"or"PM" time, Total= number+2 decimals"36.00" if none then "0",Ndias=number of days,
Nhoras= number of hours and Nminutos= number of minutes expected to be in the app.
in case a field s not needed replace value with: null eje:ECheckDate(Sdate,Ldate,Stime,Ltime,null,null,total,Ndias,null,null)*/
ECheckDate : function ECheckDate(Sdate,Ldate,Stime,Ltime,SAMPM,LAMPM,total,Ndias,Nhoras,Nminutos){
        var Imonth=["January","February","March","April","May","Jun","July","August","September","October","November","December"];
        
        if(Sdate!=null){
        it('Entry date value after click should be "'+Sdate+'"', () => {
            const $Sdate = $('#startingDate');
            expect($Sdate).toHaveValue(Sdate);
        });
        };
        if(Ldate!=null){
        it('Leaving date value after click should be "'+Ldate+'"', () => {
            const $Ldate = $('#LeavingDate');
            expect($Ldate).toHaveValue(Ldate);
        });
        };
        if(Stime!=null){
            if(SAMPM=='PM'){

                it('Check Entry Time value after click should be "'+(Number(Stime.slice(0,2))+12)+':'+(Stime.slice(3,5))+'"', () => {
                    const $Stime = $('#startingTime');
                    expect($Stime).toHaveValue((Number(Stime.slice(0,2))+12)+':'+(Stime.slice(3,5)));
                });
            }else{
                it('Check Entry Time value after click should be "'+Stime+'"', () => {
                    const $Stime = $('#startingTime');
                    expect($Stime).toHaveValue(Stime);
                });
            };
        };
        if(SAMPM!=null){
        it('Entry time AM PM value after click should be "'+SAMPM+'"', () => {
            const $AMPM = $('input[name=StartingTimeAMPM]:checked');
            expect($AMPM).toHaveValue(SAMPM);
        });
        };
        
        if(Ltime!=null){
            if(LAMPM=='PM'){
                it('Check Leaving Time value after click should be "'+(Number(Ltime.slice(0,2))+12)+':'+(Ltime.slice(3,5))+'', () => {
                    const $Stime = $('#LeavingTime');
                    expect($Stime).toHaveValue((Number(Ltime.slice(0,2))+12)+':'+(Ltime.slice(3,5)));
                });
            }else{
                it('Check Leaving Time value after click should be "'+Ltime+'"', () => {
                    const $Stime = $('#LeavingTime');
                    expect($Stime).toHaveValue(Ltime);
                });
            };
        };
        if(LAMPM!=null){
        it('Leaving time AM PM value after click should be "'+LAMPM+'"', () => {
            const $AMPM = $('input[name=LeavingTimeAMPM]:checked');
            expect($AMPM).toHaveValue(LAMPM);
        });
        };
        if(total!=null){
        it('Total value after click should be equal to: $ '+total+'', () => {
            const $total = $('span[class=SubHead]');
            expect($total).toHaveText('$ '+total);
        });
        };
        if(Ndias==null){
          Ndias=0;  
        };
        if(Nhoras==null){
            Nhoras=0;  
        };
        if(Nminutos==null){
            Nminutos=0;  
        };
        if(Ndias!=null && Nhoras!=null && Nminutos!=null){
        it('Day message to be equal to : ('+Ndias+' Days, '+Nhoras+' Hours, '+Nminutos+' Minutes)', () => {
            const $diamessage = $('span[class=BodyCopy]');
            expect($diamessage).toHaveTextContaining('('+Ndias+' Days, '+Nhoras+' Hours, '+Nminutos+' Minutes)');
        });
        };
    }
    
};