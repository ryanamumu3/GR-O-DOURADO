const supabaseUrl = "https://qrgniyboqrxakxcxdbhy.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZ25peWJvcXJ4YWt4Y3hkYmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzgwMzMsImV4cCI6MjA4OTI1NDAzM30.jceQWl0tRLF5nwsXj7lu7cxwN1QDlbMkdSbHP6A10lw";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const botao = document.getElementById("btnLogin");

botao.addEventListener("click", logar);

async function logar() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos");
        return;
    }

    const { data, error } = await supabaseClient
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .eq("senha", senha)
        .maybeSingle();

    console.log(data, error);

    if (error || !data) {
        alert("Email ou senha incorretos");
        return;
    }

    alert("Login realizado com sucesso!");

    localStorage.setItem("usuario", JSON.stringify(data));

    window.location.href = "index.html";
}
