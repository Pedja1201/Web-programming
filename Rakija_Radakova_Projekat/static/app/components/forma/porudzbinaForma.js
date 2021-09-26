export default {
    props: ["porudzbina", "dugme", "naslov", "kupci", "rakije"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaPorudzbina: this.porudzbina ? this.porudzbina : {}
        }
    },


    watch: {
        porudzbina: function(newValue, oldValue){
            this.novaPorudzbina = {...this.porudzbina};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaPorudzbina})" class="p-3">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Kupac ID: </label>
    <select class="form-select" v-model="novaPorudzbina.kupac_id" required>
        <option v-for="kupac in kupci" :value="kupac.id">-{{kupac.ime}}, {{kupac.prezime}}, {{kupac.adresa}}, {{kupac.telefon}}, {{kupac.korisnik_id}}</option>
    </select>
    <div class="form-text"><i>Izaberi kupca</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Rakija ID: </label>
    <select class="form-select" v-model="novaPorudzbina.rakija_id" required>
        <option v-for="rakija in rakije" :value="rakija.id">-{{rakija.naziv}}, {{rakija.sorta}}, {{rakija.cena}}, {{rakija.godina}}</option>
    </select>
    <div class="form-text"><i>Izaberi rakiju</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Količina: </label>
    <input type="text" class="form-control" v-model="novaPorudzbina.kolicina" required>
    <div class="form-text"><i>Uneti količinu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum: </label>
    <input type="datetime-local" class="form-control" v-model="novaPorudzbina.datum" required>
    <div class="form-text"><i>Uneti datum</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}