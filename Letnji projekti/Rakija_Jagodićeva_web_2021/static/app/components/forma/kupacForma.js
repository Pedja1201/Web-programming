export default {
    props: ["kupac", "dugme", "naslov", "korisnici"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviKupac: this.kupac ? this.kupac : {}
        }
    },


    watch: {
        kupac: function(newValue, oldValue){
            this.noviKupac = {...this.kupac};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKupac})"  class="p-3">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control" v-model="noviKupac.ime" required>
    <div class="form-text"><i>Uneti ime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control" v-model="noviKupac.prezime" required>
    <div class="form-text"><i>Uneti prezime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Adresa stanovanja: </label>
    <input type="text" class="form-control" v-model="noviKupac.adresa" required>
    <div class="form-text"><i>Uneti adresu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Broj telefona: </label>
    <input type="text" class="form-control" v-model="noviKupac.telefon" required>
    <div class="form-text"><i>Uneti broj telefona</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Korisnik ID: </label>
    <select class="form-select" v-model="noviKupac.korisnik_id" required>
        <option v-for="korisnik in korisnici" :value="korisnik.id">-{{korisnik.email}}</option>
    </select>
    <div class="form-text"><i>Izaberi korisnika</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}