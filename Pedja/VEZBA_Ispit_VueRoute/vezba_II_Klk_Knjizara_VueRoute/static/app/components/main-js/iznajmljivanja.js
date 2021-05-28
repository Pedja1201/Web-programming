export default {
    template:`
<div>
    <iznajmljivanje-forma v-bind:naslov="'Dodaj iznajmljivanje'" v-bind:dugme="'Dodaj'" v-bind:korisnici="korisnici" v-bind:knjige="knjige" v-on:sacuvaj="createIznajmljivanje"></iznajmljivanje-forma>

    <tabela-iznajmljivanja v-bind:naslov="'Tabela iznajmljivanja'" v-bind:iznajmljivanja="iznajmljivanja" v-on:uklanjanje="removeIznajmljivanje" v-on:izmena="setIznajmljivanjeZaIzmenu"></tabela-iznajmljivanja>
</div>
    `,
    data(){
        return {
            iznajmljivanja:[],
            korisnici:[],///za select
            knjige:[],///za select

            iznajmljivanjeZaIzmenu:{},
         
        }
    },
    methods:{
        setIznajmljivanjeZaIzmenu(iznajmi){ 
            this.$router.push(`/iznajmljivanja/${iznajmi.id}`);
        },

        refreshIznajmljivanje(){
            axios.get("api/iznajmljivanja").then((response) => {
                this.iznajmljivanja = response.data;
            });
            //select
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
             });

         },
        
        //dodavanje//
        createIznajmljivanje(iznajmi){
            axios.post("api/iznajmljivanja", iznajmi).then((response) => {
                this.refreshIznajmljivanje();
            });
        },
        

        //izmena//
        updateIznajmljivanje(iznajmi){
            axios.put(`api/iznajmljivanja/${iznajmi.id}`, iznajmi).then((response) => {
                this.refreshIznajmljivanje();
            });
        },

        //brisanje//
        removeIznajmljivanje(id){
            axios.delete(`api/iznajmljivanja/${id}`).then((response) => {
                this.refreshIznajmljivanje();
            });
        },

    },
    created(){
        this.refreshIznajmljivanje();
    }
}