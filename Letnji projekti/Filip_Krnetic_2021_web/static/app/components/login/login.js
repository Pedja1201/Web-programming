export default {
    template:`
<div>
<legend>
<form v-on:submit.prevent="login()" class="w-50 p-3 container fade-in">
<h1 style="text-align:center" class="alert alert-primary" role="alert"><em>Login </em></h1>
<div class="form-group">
    <label for="form-label">E-mail address</label>
    <input type="email" class="form-control aler alert-primary" v-model="korisnik.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
</div>

<div class="form-group">
    <label for="form-label">Password</label>
    <input type="password" class="form-control aler alert-primary" v-model="korisnik.lozinka" placeholder="Password">
</div>

<div>
    <button type="submit" class="btn btn-outline-success">Sign in</button>
</div>

<div class="alert alert-warning" role="alert" v-if="neuspesanLogin">Neuspešna prijava na sistem!</div>

<div class="dropdown-divider"></div>
<router-link id="log" class="nav-link active light" to="/korisnici">Registruj se kao novi korisnik</router-link>

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
            // console.log(this.korisnik);
            axios.post(`api/login`, this.korisnik).then((response) => {
                this.$router.push("/korpe");
            }, _ => {
                this.neuspesanLogin = true;
            });
        }
    }
}