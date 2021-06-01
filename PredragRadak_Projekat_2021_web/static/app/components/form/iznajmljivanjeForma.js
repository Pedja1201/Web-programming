export default {
    props: ["iznajmiti", "dugme", "naslov", "kupci", "knjige"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaIznajmljivanja: this.iznajmiti ? this.iznajmiti : {}
        }
    },
    ///Filtriranje IdKnjiga za izbacivanje samo one koje su dostupne oznacene sa "DA"
    computed:{
        stanjeKnjige: function() {
            return this.knjige.filter(knjiga => knjiga.stanje == 'DA')
        }   
    },

    watch: {
        iznajmiti: function(newValue, oldValue){
            this.novaIznajmljivanja = {...this.iznajmiti};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaIznajmljivanja})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Kupac ID: </label>
    <select class="form-select" v-model="novaIznajmljivanja.IDKupac" required>
        <option v-for="kupac in kupci" :value="kupac.IDKupac">-{{kupac.ime}}, {{kupac.prezime}}, {{kupac.email}}, {{kupac.telefon}}</option>
    </select>
    <div class="form-text"><i>Izaberi kupca</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Knjiga ID: </label>
    <select class="form-select" v-model="novaIznajmljivanja.IDKnjiga" required>
        <option v-for="knjiga in stanjeKnjige" :value="knjiga.IDKnjiga">-{{knjiga.naziv}}, {{knjiga.autor}}, {{knjiga.kategorija}}, {{knjiga.cena}}, {{knjiga.stanje}}, {{knjiga.biblioteka_id}}</option>
    </select>
    <div class="form-text">Izaberi knjigu</div>
</div>
<div class="mb-3">
    <label class="form-label">Količina: </label>
    <input type="number" class="form-control" v-model="novaIznajmljivanja.kolicina" required>
    <div class="form-text"><i>Uneti količinu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Način plaćanja: </label>
    <input type="text" class="form-control" v-model="novaIznajmljivanja.nacinPlacanja" required>
    <div class="form-text"><i>Uneti način plaćanja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Valuta: </label>
    <input type="text" class="form-control" v-model="novaIznajmljivanja.valuta" required>
    <div class="form-text"><i>Uneti valutu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Period iznajmljivanja: </label>
    <input type="text" class="form-control" v-model="novaIznajmljivanja.periodIznajmljivanja" required>
    <div class="form-text"><i>Uneti period iznajmljivanja(broj dana)</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum porudžbine: </label>
    <input type="datetime-local" class="form-control" v-model="novaIznajmljivanja.datumPorudzbine" required>
    <div class="form-text"><i>Uneti datum porudžbine</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}