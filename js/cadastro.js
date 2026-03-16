const supabaseUrl = "https://qrgniyboqrxakxcxdbhy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZ25peWJvcXJ4YWt4Y3hkYmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzgwMzMsImV4cCI6MjA4OTI1NDAzM30.jceQWl0tRLF5nwsXj7lu7cxwN1QDlbMkdSbHP6A10lw"

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)

const botao = document.getElementById("btnCadastro")

botao.addEventListener("click", cadastrar)

async function cadastrar(){

const nome = document.getElementById("nome").value
const email = document.getElementById("email").value
const senha = document.getElementById("senha").value

if(nome === "" || email === "" || senha === ""){
alert("Preencha todos os campos")
return
}

const { data, error } = await supabaseClient
.from("usuarios")
.insert([
{
nome: nome,
email: email,
senha: senha
}
])

if(error){

console.log(error)
alert("Erro ao cadastrar")

}else{

alert("Cadastro realizado com sucesso!")
window.location.href = "login.html"

}

}
