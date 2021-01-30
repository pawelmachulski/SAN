document.getElementById("ccys").addEventListener("change", calculateCcy);
document.getElementById("button").addEventListener("click", calculateCcy);

function calculateCcy(e){
    e.preventDefault();
    let inputValue = document.getElementById("inputValue").value;
    let currency = document.getElementById("ccys").value;
    let uri = "";
    switch(currency){
        case "Dolar":
            uri = "http://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json"
            break;
        case "Euro":
            uri = "http://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json"
            break;
        case "Frank":
            uri = "http://api.nbp.pl/api/exchangerates/rates/a/chf/?format=json"
            break;
    }
    fetch(uri)
    .then((resp) => resp.json())
    .then(function (data){
        console.log(data);
        rate = data.rates[0].mid;
        let result = inputValue*rate
        console.log(result)
        document.getElementById("rate").innerText = "Kurs: " + rate;
        document.getElementById("resultValue").innerText = result + " zł";
    })
    
}

