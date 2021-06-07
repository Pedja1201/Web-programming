////Prikaz jednog proizvoda i mogucnost izmene
export default {
    computed:{
        stanjeKnjige: function() {
            return this.knjige.filter(knjiga => knjiga.stanje == 'DA')
        }   
    },
/////Prikaz samo knjiga sa "DA" kao primer u formi sa computed
    template:`
<form v-on:submit.prevent="update" class="w-50 p-3">
<p><b>-Izmena iznajmljivanja</b></p>
<div class="mb-3">
    <label class="form-label">Kupac ID: </label>
    <select class="form-select" v-model="iznajmiti.IDKupac" required>
        <option v-for="kupac in kupci" :value="kupac.IDKupac">-{{kupac.ime}}, {{kupac.prezime}}, {{kupac.email}}, {{kupac.telefon}}</option>
    </select>
    <div class="form-text"><i>Izaberi kupca</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Knjiga ID: </label>
    <select class="form-select" v-model="iznajmiti.IDKnjiga" required>
        <option v-for="knjiga in stanjeKnjige" :value="knjiga.IDKnjiga">-{{knjiga.naziv}}, {{knjiga.autor}}, {{knjiga.kategorija}}, {{knjiga.cena}}, {{knjiga.stanje}}, {{knjiga.biblioteka_id}}</option>
    </select>
    <div class="form-text"><i>Izaberi knjigu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Količina: </label>
    <input type="number" class="form-control" v-model="iznajmiti.kolicina" required>
    <div class="form-text"><i>Izmeni količinu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Način plaćanja: </label>
    <input type="text" class="form-control" v-model="iznajmiti.nacinPlacanja" required>
    <div class="form-text"><i>Izmeni način plaćanja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Valuta: </label>
    <input type="text" class="form-control" v-model="iznajmiti.valuta" required>
    <div class="form-text"><i>Izmeni valutu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Period iznajmljivanja: </label>
    <input type="text" class="form-control" v-model="iznajmiti.periodIznajmljivanja" required>
    <div class="form-text"><i>Izmeni period iznajmljivanja(broj dana)</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum porudžbine: </label>
    <input type="datetime-local" class="form-control" v-model="iznajmiti.datumPorudzbine" required>
    <div class="form-text"><i>Izmeni datum porudžbine</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            iznajmiti: {},
            kupci:{}, ///select opcija
            knjige:[], ////select opcija
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