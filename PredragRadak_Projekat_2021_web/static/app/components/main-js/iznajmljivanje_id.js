////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena iznajmljivanja</b></p>
<div>
    <label>ID Kupca: </label>
    <select v-model="iznajmiti.IDKupac" required>
        <option v-for="kupac in kupci" :value="kupac.IDKupac">{{kupac.ime}},{{kupac.prezime}}-{{kupac.email}},{{kupac.telefon}}</option>
    </select>
</div>
<div>
    <label>ID Knjige: </label>
    <select v-model="iznajmiti.IDKnjiga" required>
        <option v-for="knjiga in knjige" :value="knjiga.IDKnjiga">{{knjiga.naziv}},{{knjiga.autor}}/{{knjiga.kategorija}}/{{knjiga.cena}},{{knjiga.stanje}},{{knjiga.link}}</option>
    </select>
</div>

<div>
    <label>Kolicina: </label> 
    <input type="number" v-model="iznajmiti.kolicina" required></div>
<div>
    <label>Nacin placanja: </label> 
    <input type="text" v-model="iznajmiti.nacinPlacanja" required></div>
<div>
    <label>Valuta: </label> 
    <input type="text" v-model="iznajmiti.valuta" required></div>
<div>
    <label>Period iznajmljivanja: </label> 
    <input type="text" v-model="iznajmiti.periodIznajmljivanja" required></div>
<div>
    <label>Datum porudzbine: </label> 
    <input type="datetime-local" v-model="iznajmiti.datumPorudzbine" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            iznajmiti: {},
            kupci:{}, ///select opcija
            knjige:{}, ////select opcija
        }
    },
    methods:{
        refresh(){
            axios.get(`api/iznajmljivanje/${this.$route.params['IDIznajmljivanje']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datumPorudzbine = new Date(response.data.datumPorudzbine).toISOString().split("Z")[0];
                
                this.iznajmiti = response.data;
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
            axios.put(`api/iznajmljivanje/${this.$route.params['IDIznajmljivanje']}`, this.iznajmiti).then((response) => {
                this.$router.push("/iznajmljivanje");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}