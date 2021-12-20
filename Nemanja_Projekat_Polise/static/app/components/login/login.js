///Logovanje korisnika tako da ostvari pristup podacima(aktivnostima) entiteta koji smo definisali na serveru u metodama 'getAll'
export default {
    template:`
<div class="bg-image m-3"
    style="
    background-image: url('./pictures/color.jpg');
    height: 100vh;
  ">
<legend>
<form v-on:submit.prevent="login()" class="w-50 p-3 container fade-in" id="boja2">
<h1 style="text-align:center" class="alert alert-danger" role="alert"><em>Login </em></h1>
<div class="form-group">
    <label for="form-label">E-mail address</label>
    <input type="email" class="form-control aler alert-danger" v-model="korisnik.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-warning"><i>Unique e-mail address!</i></small>
</div>

<div class="form-group">
    <label for="form-label">Password</label>
    <input type="password" class="form-control aler alert-danger" v-model="korisnik.lozinka" placeholder="Password">
</div>

<div>
    <button type="submit" class="btn btn-outline-success">Sign in</button>
</div>

<div class="alert alert-danger" role="alert" v-if="neuspesanLogin">Neuspešna prijava na sistem!</div>

<div class="dropdown-divider"></div>
<router-link id="boja" class="nav-link active light" to="/korisnici"><em>Registruj se kao novi korisnik</em></router-link>

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
                this.$router.push("/automobili");
            }, _ => {
                this.neuspesanLogin = true;
            });
        }
    }
}