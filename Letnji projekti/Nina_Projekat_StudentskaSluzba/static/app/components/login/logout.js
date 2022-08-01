///Logout stranica za odjavu sa sitema tako da nema dozvolu pruikaza odabranih tabela(aktivnosti)
export default {
    template:`
<div class="container">
<div class="alert alert-warning w-50 p-3" role="alert"> Da li želite odjavu sa sistema? </div>
<div>
    <button v-on:click="logout()" type="submit" class="btn btn-danger">Odjava</button>
</div>
</div>
    `,
    methods:{
        logout: function(){
            axios.get(`api/logout`).then((response) => {
                this.$router.push("/");
            }, _ => {
                this.neuspesanLogin = true;
            });
        }
    }
}