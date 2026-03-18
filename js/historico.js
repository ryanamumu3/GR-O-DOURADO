const supabaseUrl = "https://qrgniyboqrxakxcxdbhy.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZ25peWJvcXJ4YWt4Y3hkYmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzgwMzMsImV4cCI6MjA4OTI1NDAzM30.jceQWl0tRLF5nwsXj7lu7cxwN1QDlbMkdSbHP6A10lw"

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)

carregarHistorico()

async function carregarHistorico(){

const usuario = JSON.parse(localStorage.getItem("usuario"))

if(!usuario){
alert("Você precisa estar logado")
window.location.href = "login.html"
return
}

const { data, error } = await supabaseClient
.from("compras")
.select("*")
.eq("usuario_id", usuario.id)

if(error){
console.log(error)
return
}

const lista = document.getElementById("listaCompras")
lista.innerHTML = ""

let totalCompras = data.length
let totalValor = 0
let totalPontos = 0

data.forEach(compra => {

totalValor += Number(compra.valor)
totalPontos += Number(compra.pontos_ganhos)

const item = `
<div class="compra-item">
    <div class="compra-left">
        <div class="compra-icon">
            <img src="img/icone (2)/4.png">
        </div>
        <div class="compra-info">
            <strong>${compra.produto}</strong>
            <p>${new Date(compra.data_compra).toLocaleString()}</p>
        </div>
    </div>
    <div class="compra-valor">
        <strong>R$ ${compra.valor}</strong>
        <span>${compra.pontos_ganhos} pts</span>
    </div>
</div>
`

lista.innerHTML += item

})

atualizarResumo(totalCompras, totalValor, totalPontos)

}

function atualizarResumo(total, valor, pontos){

document.querySelectorAll(".resumo-card h2")[0].innerText = total
document.querySelectorAll(".resumo-card h2")[1].innerText = valor
document.querySelectorAll(".resumo-card h2")[2].innerText = pontos

}
