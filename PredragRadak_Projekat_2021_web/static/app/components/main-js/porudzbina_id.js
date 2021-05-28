////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena porudzbine</b></p>
<div>
    <label>ID Knjige: </label>
    <select v-model="poruceno.IDKnjiga" required>
        <option v-for="knjiga in knjige" :value="knjiga.IDKnjiga">{{knjiga.naziv}},{{knjiga.autor}}/{{knjiga.kategorija}}/{{knjiga.cena}},{{knjiga.stanje}},{{knjiga.link}}</option>
    </select>
</div>
<div>
    <label>ID Kupca: </label>
    <select v-model="poruceno.IDKupac" required>
        <option v-for="kupac in kupci" :value="kupac.IDKupac">{{kupac.ime}},{{kupac.prezime}}-{{kupac.email}},{{kupac.telefon}}</option>
    </select>
</div>

<div>
    <label>Kolicina: </label> 
    <input type="number" v-model="poruceno.kolicina" required></div>
<div>
    <label>Nacin placanja: </label> 
    <input type="text" v-model="poruceno.nacinPlacanja" required></div>
<div>
    <label>Valuta: </label> 
    <input type="text" v-model="poruceno.valuta" required></div>

<div>
    <label>Datum porudzbine: </label> 
    <input type="datetime-local" v-model="poruceno.datumPorudzbine" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            poruceno: {},
            knjige:{}, ////select opcija
            kupci:{}, ///select opcija
        }
    },
    methods:{
        refresh(){
            axios.get(`api/porudzbine/${this.$route.params['IDPorudzbina']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datumPorudzbine = new Date(response.data.datumPorudzbine).toISOString().split("Z")[0];
                
                this.poruceno = response.data;
            });
            ///Select opcija-novo!
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
            });
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
        },
        update(){
            axios.put(`api/porudzbine/${this.$route.params['IDPorudzbina']}`, this.poruceno).then((response) => {
                this.$router.push("/porudzbine");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}