const curUSD = document.querySelector('.usd');
const curEUR = document.querySelector('.eur');
const curRUB = document.querySelector('.rub');
const nowDate = new Date();

//2 hours
if (localStorage.usd && (+nowDate - localStorage.parseTime < 7200000) )  {
    //console.log('data actual');
    curUSD.innerHTML = localStorage.getItem('usd');
    curEUR.innerHTML = localStorage.getItem('eur');
    curRUB.innerHTML = localStorage.getItem('rub');
} else {
    //console.log('getting data');
    const getResource = async(url) => {
        const res = await fetch(url); //ждем ответ и записываем в res результ
        const body = await res.json(); // ждем ответ и записываем в body    
        return body;
    };
    getResource('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0')
        .then( (body) => {
            const usdCur = body[4].Cur_OfficialRate;
            const eurCur = body[5].Cur_OfficialRate;
            const rubCur = body[16].Cur_OfficialRate;
            //const time = new Date();
            //insert to the page
            curUSD.innerHTML = usdCur;
            curEUR.innerHTML = eurCur;
            curRUB.innerHTML = rubCur;
            //save to localStorage
            localStorage.setItem('usd', usdCur );
            localStorage.setItem('eur', eurCur );
            localStorage.setItem('rub', rubCur );
            //save time of parcing
            localStorage.setItem('parseTime', +new Date());            
    
        } );


}







      