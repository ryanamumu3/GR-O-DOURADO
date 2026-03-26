const supabaseUrl = "https://qrgniyboqrxakxcxdbhy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZ25peWJvcXJ4YWt4Y3hkYmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzgwMzMsImV4cCI6MjA4OTI1NDAzM30.jceQWl0tRLF5nwsXj7lu7cxwN1QDlbMkdSbHP6A10lw"

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)

carregarPontos()

async function carregarPontos(){
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    if(!usuario){
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

    let pontos = 0
    data.forEach(c => pontos += Number(c.pontos_ganhos))
    document.getElementById("pontos").innerText = pontos

    let nivel = "Bronze"
    let proximo = "Prata"
    let meta = 500

    if(pontos >= 500){
        nivel = "Prata"
        proximo = "Ouro"
        meta = 1000
    }
    if(pontos >= 1000){
        nivel = "Ouro"
        proximo = "Diamante"
        meta = 1500
    }
    if(pontos >= 1500){
        nivel = "Diamante"
        proximo = "Máximo"
        meta = 1500
    }

    document.getElementById("nivel").innerText = nivel
    document.getElementById("proximo").innerText = "Próximo nível: " + proximo

    let porcentagem = (pontos / meta) * 100
    if(porcentagem > 100) porcentagem = 100

    const barra = document.getElementById("barra")
    barra.style.width = porcentagem + "%"

    if(nivel === "Bronze") barra.style.background = "#cd7f32"
    if(nivel === "Prata")  barra.style.background = "#c0c0c0"
    if(nivel === "Ouro")   barra.style.background = "#ffd700"
    if(nivel === "Diamante") barra.style.background = "#00bfff"

    let restante = meta - pontos
    if(restante < 0) restante = 0
    document.getElementById("restante").innerText = restante + " pontos restantes"

    liberarVouchers(pontos)
}

function liberarVouchers(pontos){
    const cards = document.querySelectorAll(".voucher-card")
    const regras = [100, 200, 400, 700]

    cards.forEach((card, index) => {
        const span = card.querySelector("span")
        const overlay = card.querySelector(".lock-overlay")

        if(pontos >= regras[index]){
            card.classList.remove("locked")
            if(overlay) overlay.style.display = "none"
            span.innerText = "✓ Disponível"
            span.classList.add("green")
        }else{
            card.classList.add("locked")
            if(overlay) overlay.style.display = "flex"
            const faltam = regras[index] - pontos
            span.innerText = `Faltam ${faltam} pontos`
            span.classList.remove("green")
        }
    })

    // ADICIONA CLIQUE NOS CARDS
    cards.forEach(card => {
        card.addEventListener("click", usarVoucher)
    })
}

// ===== NOVA FUNÇÃO =====
function usarVoucher(event){
    const card = event.currentTarget

    if(card.classList.contains("locked")){
        return
    }

    const nome = card.querySelector("h4").innerText

    const codigo = "CAFE-" + Math.random().toString(36).substring(2, 8).toUpperCase()

    document.getElementById("voucher-nome").innerText = nome
    document.getElementById("codigo-gerado").innerText = codigo
    document.getElementById("popup-codigo").style.display = "flex"
}

function fecharPopup(){
    document.getElementById("popup-codigo").style.display = "none"
}
