////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena skole</b></p>
<div>
    <label>ID: </label>
    <input type="number" v-model="skola.id" required></div>
<div>
    <label>Ime skole: </label>
    <input type="text" v-model="skola.ime_skole" required></div>
<div>
    <label>Adresa: </label>
    <input type="text" v-model="skola.adresa" required></div>
<div>
    <label>ID-Nastavnika: </label>
    <select v-model="skola.nastavnik_licni_id" required>
        <option v-for="nastavnik in nastavnici" :value="nastavnik.licni_id">{{nastavnik.ime}}, {{nastavnik.prezime}}, {{nastavnik.email}}/{{nastavnik.br_telefona}}</option>
    </select>
</div>
<div>
    <label>ID-Predmeta: </label>
    <select v-model="skola.predmet_id" required>
        <option v-for="predmet in predmeti" :value="predmet.id">{{predmet.ime_predmeta}}, {{predmet.razred}}</option>
    </select>
</div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            skola: {},
            nastavnici:{}, ///select opcija
            predmeti:{}, ///select opcija
        }
    },
    methods:{
        refresh(){
            axios.get(`api/skole/${this.$route.params['id']}`).then((response) => {
                this.skola = response.data;
            });
            //select opcija-novo
            axios.get("api/nastavnici").then((response) => {
                this.nastavnici = response.data;
            });
            axios.get("api/predmeti").then((response) => {
                this.predmeti = response.data;
            });
        },
        ///izmena i vracanje na pocetnu
        update(){
            axios.put(`api/skole/${this.$route.params['id']}`, this.skola).then((response) => {
                this.$router.push("/skole");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}