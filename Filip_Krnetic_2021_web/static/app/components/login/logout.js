///Logout stranica za odjavu sa sitema tako da nema dozvolu pruikaza odabranih tabela(aktivnosti)
export default {
    template:`
<div class="container">
<div class="alert alert-danger w-50 p-3" role="alert"> Da li ste sigurni da želite odjavu?</div>
<div>
    <button v-on:click="logout()" type="submit" class="btn btn-danger">Logout</button>
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