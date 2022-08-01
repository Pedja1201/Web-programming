export default {
    template:`
<div class="w-75 p-3" v-if="stranicaZaPrikaz=='korisnici'">
    <tabela-korisnika v-bind:naslov="'Tabela korisnika'" v-bind:korisnici="korisnici" v-on:uklanjanje="removeKorisnik" v-on:izmena="setKorisnikZaIzmenu"></tabela-korisnika>
</div>

<div class="w-50 p-3">
    <korisnik-form v-on:sacuvaj="createKorisnik" v-bind:naslov="'Dodaj korisnika'" v-bind:dugme="'Registruj se'"></korisnik-form>
</div>
<button v-on:click="navigate('korisnici')" type="button" class="btn btn-outline-primary btn-lg btn-block m-3">Prijavljeni korisnici</button>

    `,
    data(){
        return {
            korisnici:[],

            korisnikZaIzmenu:{},
            stranicaZaPrikaz:"",
          
        }
    },
    methods:{
        setKorisnikZaIzmenu(korisnik){ //skladistenje nakon izmene//
            this.$router.push(`/korisnici/${korisnik.id}`);
        },

        refreshKorisnik(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },

        //dodavanje//
        createKorisnik(korisnik){
            axios.post("api/korisnici", korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },

        //izmena//
        updateKorisnik(korisnik){
            axios.put(`api/korisnici/${korisnik.id}`, korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },

        //brisanje//
        removeKorisnik(id){
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshKorisnik();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }

    },
    created(){
        this.refreshKorisnik();
    }
}