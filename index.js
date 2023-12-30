async function getAddressByCep () {
    const cep = document.getElementById("cep").value;
    var city = null;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if(!data.erro) {

            document.getElementById("cidade").value = data.localidade;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("rua").value = data.logradouro;
            city = data.localidade;

            try {
                const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=66a27daffc724065aad215334232912&q=${city}&days=5&aqi=no&alerts=yes`);
                const data = await response.json();
                document.getElementById("card").removeAttribute("style");
                document.getElementById("result").innerHTML = "";
                for(let index = 0; index < data.forecast.forecastday.length; index++){
                    document.getElementById("result").innerHTML += `
                    <div class="col mb-3 mb-sm-0">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-subtitle">${converterDate(data.forecast.forecastday[index].date)}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Máx: ${data.forecast.forecastday[index].day.maxtemp_c} °C</li>
                                <li class="list-group-item">Min: ${data.forecast.forecastday[index].day.mintemp_c} °C</li>
                            </ul>
                        </div>
                    </div>
                    `
                }
            } catch (error) {
                console.log("Localidade não encontrada");
                document.getElementById("cep").value = "";
                document.getElementById("cidade").value = "";
                document.getElementById("bairro").value = "";
                document.getElementById("rua").value = "";
                document.getElementById("card").setAttribute("style", "display: none");
            }
        }else{
            alert("CEP Digitado não encontrado ou inválido!");
            console.log("Localidade não encontrada");
            document.getElementById("cep").value = "";
            document.getElementById("cidade").value = "";
            document.getElementById("bairro").value = "";
            document.getElementById("rua").value = "";
            document.getElementById("card").setAttribute("style", "display: none");
        }
            
    } catch (error) {
        alert("CEP digitado não é válido ou não foi encontrado");
        document.getElementById("cep").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("rua").value = "";
        document.getElementById("card").setAttribute("style", "display: none");
    }

}

function converterDate (date) {
    const dt = new Date(date).toLocaleDateString();
    return dt;
}
