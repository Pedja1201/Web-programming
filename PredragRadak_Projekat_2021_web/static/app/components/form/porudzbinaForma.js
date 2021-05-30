export default {
    props: ["poruceno", "dugme", "naslov", "knjige", "kupci"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaPorudzbina: this.poruceno ? this.poruceno : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     porudzbinaZaIzmenu: {
    //         get : function(){
    //             return {...this.poruceno};
    //         },
    //         set: function(novi){
    //             this.novaPorudzbina = {...novi};
    //         }
    //     }
    // },

    watch: {
        poruceno: function(newValue, oldValue){
            this.novaPorudzbina = {...this.poruceno};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaPorudzbina})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Knjiga ID: </label>
    <select class="form-select" v-model="novaPorudzbina.IDKnjiga" required>
        <option v-for="knjiga in knjige" :value="knjiga.IDKnjiga">-{{knjiga.naziv}}, {{knjiga.autor}}, {{knjiga.kategorija}}, {{knjiga.cena}}, {{knjiga.stanje}}, {{knjiga.biblioteka_id}}</option>
    </select>
    <div class="form-text"><i>Izaberi knjigu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Kupac ID: </label>
    <select class="form-select" v-model="novaPorudzbina.IDKupac" required>
        <option v-for="kupac in kupci" :value="kupac.IDKupac">-{{kupac.ime}}, {{kupac.prezime}}, {{kupac.email}}, {{kupac.telefon}}</option>
    </select>
    <div class="form-text"><i>Izaberi kupca</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Količina: </label>
    <input type="number" class="form-control" v-model="novaPorudzbina.kolicina" required>
    <div class="form-text"><i>Uneti količinu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Način plaćanja: </label>
    <input type="text" class="form-control" v-model="novaPorudzbina.nacinPlacanja" required>
    <div class="form-text"><i>Uneti način plaćanja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Valuta: </label>
    <input type="text" class="form-control" v-model="novaPorudzbina.valuta" required>
    <div class="form-text"><i>Uneti valutu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum porudžbine: </label>
    <input type="datetime-local" class="form-control" v-model="novaPorudzbina.datumPorudzbine" required>
    <div class="form-text"><i>Uneti datum porudžbine</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}
