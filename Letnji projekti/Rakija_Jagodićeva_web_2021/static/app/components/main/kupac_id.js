////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena kupca</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control" v-model="kupac.ime" required>
    <div class="form-text"><i>Izmeni ime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control" v-model="kupac.prezime" required>
    <div class="form-text"><i>Izmeni prezime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Adresa stanovanja: </label>
    <input type="text" class="form-control" v-model="kupac.adresa" required>
    <div class="form-text"><i>Izmeni adresu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Broj telefona: </label>
    <input type="text" class="form-control" v-model="kupac.telefon" required>
    <div class="form-text"><i>Izmeni broj telefona</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Korisnik ID: </label>
    <select class="form-select" v-model="kupac.korisnik_id" required>
        <option v-for="korisnik in korisnici" :value="korisnik.id">-{{korisnik.email}}</option>
    </select>
    <div class="form-text"><i>Izaberi korisnika</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            kupac: {},
            korisnici:{},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/kupci/${this.$route.params['id']}`).then((response) => {
                this.kupac = response.data;
            });
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        update(){
            axios.put(`api/kupci/${this.$route.params['id']}`, this.kupac).then((response) => {
                this.$router.push("/kupci");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}