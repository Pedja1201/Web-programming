////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena porudžbine</b></p>
<div class="mb-3">
    <label class="form-label">Kupac ID: </label>
    <select class="form-select" v-model="porudzbina.kupac_id" required>
        <option v-for="kupac in kupci" :value="kupac.id">-{{kupac.ime}}, {{kupac.prezime}}, {{kupac.adresa}}, {{kupac.telefon}}, {{kupac.korisnik_id}}</option>
    </select>
    <div class="form-text"><i>Izaberi kupca</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Rakija ID: </label>
    <select class="form-select" v-model="porudzbina.rakija_id" required>
        <option v-for="rakija in rakije" :value="rakija.id">-{{rakija.naziv}}, {{rakija.sorta}}, {{rakija.cena}}, {{rakija.godina}}</option>
    </select>
    <div class="form-text"><i>Izaberi rakiju</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Količina: </label>
    <input type="text" class="form-control" v-model="porudzbina.kolicina" required>
    <div class="form-text"><i>Izmeni količinu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum: </label>
    <input type="datetime-local" class="form-control" v-model="porudzbina.datum" required>
    <div class="form-text"><i>Izmeni datum</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            porudzbina: {},
            kupci:{}, ///select opcija
            rakije:[], ////select opcija
        }
    },
    methods:{
        refresh(){
            axios.get(`api/porudzbine/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum = new Date(response.data.datum).toISOString().split("Z")[0];
                this.porudzbina = response.data;
            });
            ///Select opcija-novo
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
             });
             axios.get("api/rakije").then((response) => {
                this.rakije = response.data;
            });
        },
        update(){
            axios.put(`api/porudzbine/${this.$route.params['id']}`, this.porudzbina).then((response) => {
                this.$router.push("/porudzbine");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}