///Logovanje korisnika tako da ostvari pristup podacima(aktivnostima) entiteta koji smo definisali na serveru u metodama 'getAll'
export default {
    template:`
<div>
<legend>
<form v-on:submit.prevent="login()" class="w-50 p-3 container fade-in">
<h1  class="alert alert-warning" role="alert">Login</h1>
<div class="form-group">
    <label for="form-label">E-mail address</label>
    <input type="email" class="form-control aler alert-warning" v-model="korisnik.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
</div>

<div class="form-group">
    <label for="form-label">Password</label>
    <input type="password" class="form-control aler alert-warning" v-model="korisnik.lozinka" placeholder="Password">
</div>

<div>
    <button type="submit" class="btn btn-outline-success">Prijavi se</button>
</div>

<div class="alert alert-primary" role="alert" v-if="neuspesanLogin">Neuspešna prijava na sistem!</div>

<div class="dropdown-divider"></div>
<router-link style="color:black;" class="nav-link active light" to="/korisnici"><em>Zaboravio si lozinku?</em></router-link>

</form>
</legend>
</div>
    `,
    data : function(){
        return {
            korisnik:{
                "email":"",
                "lozinka": ""
            },
            neuspesanLogin: false
        };
    },
    methods:{
        login: function(){
            axios.post(`api/login`, this.korisnik).then((response) => {
                this.$router.push("/polaganja");
            }, _ => {
                this.neuspesanLogin = true;
            });
        }
    }
}