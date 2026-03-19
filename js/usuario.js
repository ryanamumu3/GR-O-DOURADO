const supabaseUrl = "https://qrgniyboqrxakxcxdbhy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZ25peWJvcXJ4YWt4Y3hkYmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzgwMzMsImV4cCI6MjA4OTI1NDAzM30.jceQWl0tRLF5nwsXj7lu7cxwN1QDlbMkdSbHP6A10lw"

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)

carregarUsuario()

async function carregarUsuario(){
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    if(!usuario){
        window.location.href = "login.html"
        return
    }

    document.getElementById("nome").innerText = usuario.nome
    document.getElementById("email").innerText = usuario.email

    
    const { data } = await supabaseClient
        .from("compras")
        .select("*")
        .eq("usuario_id", usuario.id)

    let pontos = 0
    data.forEach(c => pontos += Number(c.pontos_ganhos))

    document.getElementById("pontos").innerText = pontos

    let nivel = "Bronze"
    if(pontos >= 500) nivel = "Prata"
    if(pontos >= 1000) nivel = "Ouro"
    if(pontos >= 1500) nivel = "Diamante"

    document.getElementById("nivel").innerText = nivel
}


function editar(){
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    document.getElementById("inputNome").value = usuario.nome
    document.getElementById("inputEmail").value = usuario.email

    document.getElementById("nome").style.display = "none"
    document.getElementById("email").style.display = "none"

    document.getElementById("inputNome").style.display = "inline"
    document.getElementById("inputEmail").style.display = "inline"

    document.getElementById("btnSalvar").style.display = "inline"
}


async function salvar(){
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    const novoNome = document.getElementById("inputNome").value
    const novoEmail = document.getElementById("inputEmail").value

    const { error } = await supabaseClient
        .from("usuarios")
        .update({
            nome: novoNome,
            email: novoEmail
        })
        .eq("id", usuario.id)

    if(error){
        alert("Erro ao atualizar")
        console.log(error)
        return
    }

    usuario.nome = novoNome
    usuario.email = novoEmail

    localStorage.setItem("usuario", JSON.stringify(usuario))

    document.getElementById("nome").innerText = novoNome
    document.getElementById("email").innerText = novoEmail

    document.getElementById("nome").style.display = "inline"
    document.getElementById("email").style.display = "inline"

    document.getElementById("inputNome").style.display = "none"
    document.getElementById("inputEmail").style.display = "none"

    document.getElementById("btnSalvar").style.display = "none"

    alert("Atualizado com sucesso!")
}

// ===== sair da conta =====
function logout(){
    localStorage.removeItem("usuario")
    window.location.href = "login.html"
}
