export default {
    template:`
<div class="w-50 p-3">
    <iznajmljivanje-form v-on:sacuvaj="createIznajmljivanje" v-bind:naslov="'Dodaj iznajmljivanje'" v-bind:dugme="'Dodaj'" v-bind:knjige="knjige" v-bind:kupci="kupci"></iznajmljivanje-form>
</div>
<button v-on:click="navigate('iznajmljivanja')" type="button" class="btn btn-primary btn-lg btn-block">Prikaz iznjamljivanja</button>

<div class="w-80 p-3" v-if="stranicaZaPrikaz=='iznajmljivanja'">
    <tabela-iznajmljivanja v-bind:naslov="'Tabela iznajmljivanja'" v-bind:iznajmljivanje="iznajmljivanje" v-on:uklanjanje="removeIznajmljivanje" v-on:izmena="setIznajmljivanjeZaIzmenu"></tabela-iznajmljivanja>
</div>
    `,
    data(){
        return {
            iznajmljivanje:[],
            knjige:[],  ///select opcija
            kupci:[], ///select opcija
            
            iznajmljivanjeZaIzmenu:{},
            stranicaZaPrikaz: "",
          
        }
    },
    methods:{
        setIznajmljivanjeZaIzmenu(iznajmiti){ //skladistenje nakon izmene//
            this.$router.push(`/iznajmljivanje/${iznajmiti.IDIznajmljivanje}`);
        },
 

        refreshIznajmljivanje(){
            axios.get("api/iznajmljivanje").then((response) => {
                this.iznajmljivanje = response.data;
            });
            ///Select opcija-novo!
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
            });
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
        },

        //dodavanje//
        createIznajmljivanje(iznajmiti){
            axios.post("api/iznajmljivanje", iznajmiti).then((response) => {
                this.refreshIznajmljivanje();
            });
        },

        //izmena//
        updateIznajmljivanje(iznajmiti){
            axios.put(`api/iznajmljivanje/${iznajmiti.IDIznajmljivanje}`, iznajmiti).then((response) => {
                this.refreshIznajmljivanje();
            });
        },

        //brisanje//
        removeIznajmljivanje(IDIznajmljivanje){
            axios.delete(`api/iznajmljivanje/${IDIznajmljivanje}`).then((response) => {
                this.refreshIznajmljivanje();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }

    },
    created(){
        this.refreshIznajmljivanje();
    }
}