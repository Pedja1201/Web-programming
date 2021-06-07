///Logout stranica za odjavu sa sitema tako da nema dozvolu pruikaza odabranih tabela(aktivnosti)
export default {
    template:`
<div class="container">
<div class="alert alert-warning w-50 p-3" role="alert"> Jeste li sigurni da želite da se odjavite?</div>
<div>
    <button v-on:click="logout()" type="submit" class="btn btn-danger">Logout</button>
</div>
</div>
    `,
    methods:{
        logout: function(){
            axios.get(`api/logout`).then((response) => {
            }, _ => {
                this.neuspesanLogin = true;
            });
        }
    }
}