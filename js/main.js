//Efetuando uma consulta em API

//Definição de variáveis
var url = 'https://api.covid19api.com/dayone/country/brazil';
var jsonResponse;

const initialDate = new Date('2020-02-26 00:00:00');
const today = new Date();

//Chama função de consulta
getJSON(url, function(data) {
    jsonResponse = data;
    });

window.onload = function() {
    document.getElementById("head1").innerHTML = 
        "<div>" +
            "<h1>Consulta Casos de Covid</h1>" +
            "<h2>Mackenzie - Projeto PPADS</h2>" +
        "</div>";
    document.getElementById("content1").innerHTML = 
        "<article class='period'>" +
            "<form action='' onsubmit='buildDateAndShowData();return false';>" + 
                "<p>" +
                    "<select id='yearForm' name='Ano'>" + 
                        "<option selected disabled>Escolha o Ano</option>" + 
                        "<option value='2020'>2020</option>" + 
                        "<option value='2021'>2021</option>" +
                        "<option value='2022'>2022</option>" +
                    "</select>" +
                "</p>" +
                "<p>" +
                    "<select id='monthForm' name='Mês'>" +
                        "<option selected disabled>Escolha o Mês</option>" +
                        "<option value='Jan'>Jan</option>" +
                        "<option value='Feb'>Fev</option>" +
                        "<option value='Mar'>Mar</option>" +
                        "<option value='Apr'>Abr</option>" +
                        "<option value='May'>Mai</option>" +
                        "<option value='Jun'>Jun</option>" +
                        "<option value='Jul'>Jul</option>" +
                        "<option value='Aug'>Ago</option>" +
                        "<option value='Sep'>Set</option>" +
                        "<option value='Oct'>Out</option>" +
                        "<option value='Nov'>Nov</option>" +
                        "<option value='Dec'>Dez</option>" +
                    "</select>" +
                "</p>" +
                "<p>" + 
                    "<select id='dayForm' name='Dia'>" +
                        "<option selected disabled>Escolha o Dia</option>" +
                        "<option value='01'>01</option>" +
                        "<option value='02'>02</option>" +
                        "<option value='03'>03</option>" +
                        "<option value='04'>04</option>" +
                        "<option value='05'>05</option>" +
                        "<option value='06'>06</option>" +
                        "<option value='07'>07</option>" +
                        "<option value='08'>08</option>" +
                        "<option value='09'>09</option>" +
                        "<option value='10'>10</option>" +
                        "<option value='11'>11</option>" +
                        "<option value='12'>12</option>" +
                        "<option value='13'>13</option>" +
                        "<option value='14'>14</option>" +
                        "<option value='15'>15</option>" +
                        "<option value='16'>16</option>" +
                        "<option value='17'>17</option>" +
                        "<option value='18'>18</option>" +
                        "<option value='19'>19</option>" +
                        "<option value='20'>20</option>" +
                        "<option value='21'>21</option>" +
                        "<option value='22'>22</option>" +
                        "<option value='23'>23</option>" +
                        "<option value='24'>24</option>" +
                        "<option value='25'>25</option>" +
                        "<option value='26'>26</option>" +
                        "<option value='27'>27</option>" +
                        "<option value='28'>28</option>" +
                        "<option value='29'>29</option>" +
                        "<option value='30'>30</option>" +
                        "<option value='31'>31</option>" +
                    "</select>" +
                "</p>" +
                "<p><input type='submit' value='Consultar'></p>" +
            "</form>" +
        "</article>";
}

//Função para construir data e mostrar dados
function buildDateAndShowData() {
    var userYear = document.getElementById('yearForm').value;
    var userMonth = document.getElementById('monthForm').value;
    var userDay = document.getElementById('dayForm').value;

    let dateForm = new Date(userYear + "-" + userMonth + "-" + userDay);

    var day = dateForm.getUTCDate();
    var month = dateForm.getUTCMonth() + 1;
    var year = dateForm.getFullYear();

    let dayBefore = new Date(dateForm.getTime() - 24*60*60*1000);

    var diff = Math.floor((dateForm.getTime() - initialDate.getTime()) / (1000 * 60 * 60 * 24)) - 1;
    var diffToday = Math.floor(today.getTime() - dateForm.getTime()) / (1000 * 60 * 60 * 24) - 1;

    if (diff < 0 || diffToday < 0) {
        document.getElementById("content2").innerHTML =
        "<article class='result'>" +
        "<h1>Informações do dia: <span>" + day + "/" + month + "/" + year + "</span></h1>" +
            "<p class='resultNone'>Sem informações para a data informada!</p>" +
        "</article>";
    } else {
        var country = jsonResponse[diff].Country;
        var cases = jsonResponse[diff].Confirmed;
        var casesDif = jsonResponse[diff].Confirmed - jsonResponse[diff-1].Confirmed;
        var deaths = jsonResponse[diff].Deaths;
        var recovered = cases - deaths;

        document.getElementById("content2").innerHTML =
        "<article class='result'>" +
            "<h1>Informações do dia: <span>" + day + "/" + month + "/" + year + "</span></h1>" +
            "<p class='result'>País: " + country + "</p>" +
            "<p class='result'>Casos do Dia: " + parseInt(casesDif).toLocaleString('pt-BR') + "</p>" +
            "<p class='result'>Casos Acumulados: " + parseInt(cases).toLocaleString('pt-BR') + "</p>" +
            "<p class='result'>Recuperados: " + parseInt(recovered).toLocaleString('pt-BR') + "</p>" +
            "<p class='result'>Mortes: " + parseInt(deaths).toLocaleString('pt-BR') + "</p>" +
        "</article>";
    }
}


//Função de consulta
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Dados recebidos com sucesso!');
            callback (xhr.response);
        } else {
            console.log ('Problema ao conectar com a API: ' + xhr.status);
        }
    }
    xhr.send();
}
