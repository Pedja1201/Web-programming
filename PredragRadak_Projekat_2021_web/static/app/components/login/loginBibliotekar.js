///Logovanje bibliotekara tako da ostvari pristup podacima(aktivnostima) entiteta koji smo definisali na serveru u metodama 'getAll'
export default {
    template:`
    <!-- Background image -->
<div
    class="bg-image"
    style="
    background-image: url('./pictures/Biblioteka.jpg');
    height: 100vh;
      ">
<legend>
<form v-on:submit.prevent="login()" class="w-25 p-3 container fade-in">
<h1 class="text-light" role="alert">Admin <em>LOGIN</em></h1>
<div class="form-group" id="boja">
    <label for="form-label">Username</label>
    <input type="username" class="form-control aler alert-primary" v-model="bibliotekar.korisnicko_ime" id="exampleInput" aria-describedby="userHelp" placeholder="Enter username">
    <small id="userlHelp" class="form-text text-warning"><i>Unique username!</i></small>
</div>

<div class="form-group" id="boja">
    <label for="form-label">Password</label>
    <input type="password" class="form-control aler alert-primary" v-model="bibliotekar.lozinka" placeholder="Password">
</div>

<div>
    <button type="submit" class="btn btn-outline-success">Prijavi se</button>
</div>

<div class="alert alert-danger" role="alert" v-if="neuspesanLogin">Neuspešna prijava na sistem!</div>

<div class="dropdown-divider"></div>
<router-link id="boja" class="nav-link active light" to="/bibliotekari"><em>New around here? Sign up.</em></router-link>
<router-link id="boja" class="nav-link active" to="/bibliotekari"><em>Forgot password? </em></router-link>

</form>
</legend>
</div>
    `,
    data : function(){
        return {
            bibliotekar:{
                "korisnicko_ime":"",
                "lozinka": ""
            },
            neuspesanLogin: false
        };
    },
    methods:{
        login: function(){
            // console.log(this.korisnik);
            axios.post(`api/loginBibliotekar`, this.bibliotekar).then((response) => {
                this.$router.push("/knjige");
            }, _ => {
                this.neuspesanLogin = true;
            });
        }
    }
}