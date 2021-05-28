////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena iznajmljivanja</b></p>
<div>
    <label>Korisnik ID: </label>
    <select v-model="iznajmi.korisnik_id" required>
        <option v-for="korisnik in korisnici" :value="korisnik.id">{{korisnik.korisnicko_ime}},{{korisnik.ime}},{{korisnik.prezime}}</option>
    </select>
</div>
<div>
    <label>Knjiga ID: </label>
    <select v-model="iznajmi.knjiga_id" required>
        <option v-for="knjiga in knjige" :value="knjiga.id">{{knjiga.naslov}},{{knjiga.autor}}</option>
    </select>
</div>

<div>
    <label>Datum iznajmljivanja: </label>
    <input type="datetime-local" v-model="iznajmi.datum_iznajmljivanja" required></div>
<div>
    <label>Rok vracanja: </label>
    <input type="datetime-local" v-model="iznajmi.rok_vracanja" required></div>
<div>
    <label>Datum vracanja: </label>
    <input type="datetime-local" v-model="iznajmi.datum_vracanja" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="iznajmi.cena" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            iznajmi: {},
            korisnici:{}, ///Select opcija
            knjige:{}, ///Select opcija

        }
    },
    methods:{
        refresh(){
            axios.get(`api/iznajmljivanja/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                    response.data.datum_iznajmljivanja = new Date(response.data.datum_iznajmljivanja).toISOString().split("Z")[0];
                    response.data.rok_vracanja = new Date(response.data.rok_vracanja).toISOString().split("Z")[0];
                    response.data.datum_vracanja = new Date(response.data.datum_vracanja).toISOString().split("Z")[0];
    
                this.iznajmi = response.data;
            });
             //select
             axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
             });
        },
        update(){
            axios.put(`api/iznajmljivanja/${this.$route.params['id']}`, this.iznajmi).then((response) => {
                this.$router.push("/iznajmljivanja");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}