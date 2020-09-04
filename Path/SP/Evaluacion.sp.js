const Tools = require('./../Tool/datauto');


/*just click on calculate to verfy warning and error elements*/
describe('just click on calculate to verify warning and error elements',()=>{
    it('Open Browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    it('Set and check Parking tipe value to "Valet Parking"',()=>{
        const $parking = browser.$('select[id="ParkingLot"]');
        expect($parking).toHaveValue('Valet');
    });
    it('Click on calculate: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.Warnings(1,1,1);
});

/*Entry date after Leaving date sould throw error message*/
describe('Entry date after Leaving date should throw error message',()=>{
    it('Open Browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    Tools.ESetDate(12,11,11,null,null,null,null);
    it('Click on calculate: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.Warnings(null,null,1);
});
/*Entry information Without changing Entry date should throw error and warning message*/
describe('Entry information Without changing Entry date should throw error and warning message',()=>{
    it('Open Browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    Tools.ESetDate(null,12,11,null,null,null,null);
    it('Click on calculate: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.Warnings(1,1,1);
});
/**/
describe('Entry information With blank Entry date should throw error and warning message',()=>{
    it('Open Browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
it('Set and Check Entry date value to " "', () => {
    const $Sdate = $('#startingDate');
    $Sdate.setValue(" ");
    expect($Sdate).toHaveValue(" ");
});
    Tools.ESetDate(null,11,11,null,null,null,null);
    it('Click on calculate: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.Warnings(1,1,1);
});
/*Enter the same Entry and leaving date and same entry and leaving time, total should be "0"*/
describe('Enter Same date and Same time',()=>{
    it('Open browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    Tools.ESetDate(12,12,11,"10:00","10:00",null,null);
    it('click on calculate',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    it('Total value to be equal: $ 0', () => {
        const $total = $('span[class=SubHead]');
        expect($total).toHaveText('$ 0');
    });
    it('Day message value to be equal to : (0 Days, 0 Hours, 0 Minutes)', () => {
        const $diamessage = $('span[class=BodyCopy]');
        expect($diamessage).toHaveTextContaining('(0 Days, 0 Hours, 0 Minutes)');
    });
});
/*Enter text instead of date*/
describe('Enter Text instead of date',()=>{
    it('Open browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    /*inputs text directly to date box*/
    it('Set and Check Entry date value to "abcd"', () => {
        const $Sdate = $('#startingDate');
        $Sdate.setValue('abcd');
        expect($Sdate).toHaveValue('abcd');
    });
    /*inputs text directly to date box*/
    it('Set and Check Leving date value to "abcd"', () => {
        const $Ldate = $('#LeavingDate');
        $Ldate.setValue('abcd');
        expect($Ldate).toHaveValue('abcd');
    });
    it('Click on calculate',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.Warnings(1,1,1);
});
/*Set Time to PM should be PM after click*/
describe('Set Time to PM should be PM after click',()=>{
    
    it('open browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    Tools.ESetDate(16,18,11,'08:00','08:00','PM','PM');

    it('Click on calculate: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.ECheckDate(null,null,null,null,"PM","PM","36.00",2,null,null);

});
/**/
describe('Click calculate then enter date and click calculate again',()=>{
    
    it('Open browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });

    it('Click on calculate: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.Warnings(1,1,1);
    Tools.ESetDate(12,14,11,'08:00','08:00','AM','PM');
    it('Click on calculate: ',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.ECheckDate("12/12/2020","12/14/2020",'08:00','08:00','AM','PM',"54.00",2,12,0);
});
/*should throw Erro message if month bigger than 12 */
describe('Input date month number value bigger than 12 = December should throw Error message',()=>{
    
    it('Open browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    it('Set and Check Entry date value to "14/12/2020"', () => {
        const $Sdate = $('#startingDate');
        $Sdate.setValue('14/12/2020');
        expect($Sdate).toHaveValue('14/12/2020');
    });
    it('Set and Check Leaving date value to "14/14/2020"', () => {
        const $Sdate = $('#leavingDate');
        $Sdate.setValue('14/14/2020');
        expect($Sdate).toHaveValue('14/14/2020');
    });
    Tools.Warnings(1,1,1)
});
/**/
describe('Entry and Leaving time PM twice',()=>{

    it('Open browser',()=>{
        browser.url('http://www.shino.de/parkcalc');
    });
    Tools.ESetDate(12,14,11,"08:00","08:00","PM","PM");
    it('click on Calculate',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.ECheckDate("12/12/2020","12/14/2020","08:00","08:00","PM","PM","36.00",2,null,null);
    Tools.ESetDate(null,null,null,null,null,"PM","PM");
    it('click on Calculate',()=>{
        const $buttom = $('input[type=Submit]');
        $buttom.click();
    });
    Tools.ECheckDate("12/12/2020","12/14/2020","08:00","08:00","PM","PM","36.00",2,null,null);
});
