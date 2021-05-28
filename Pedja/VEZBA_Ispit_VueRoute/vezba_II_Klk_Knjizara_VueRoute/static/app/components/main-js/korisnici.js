export default {
    template:`
<div>
    <korisnik-forma v-bind:naslov="'Dodaj korisnika'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createKorisnik"></korisnik-forma>

    <tabela-korisnika v-bind:naslov="'Tabela korisnika'" v-bind:korisnici="korisnici" v-on:uklanjanje="removeKorisnik" v-on:izmena="setKorisnikZaIzmenu"></tabela-korisnika>
</div>
    `,
    data(){
        return {
            korisnici:[],
        
            korisnikZaIzmenu:{},
            
        }
    },
    methods:{
        setKorisnikZaIzmenu(korisnik){ //skladistenje nakon izmene//
            this.$router.push(`/${korisnik.id}`);
        },

        refreshKorisnik(){
             //saljem this van funkcije da obuhvati sve//
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
    
    },
    created(){
        this.refreshKorisnik();
    }
}