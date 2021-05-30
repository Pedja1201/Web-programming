export default {
    props: ["knjiga", "dugme", "naslov", "biblioteke"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKnjiga: this.knjiga ? this.knjiga : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     knjigaZaIzmenu: {
    //         get : function(){
    //             return {...this.knjiga};
    //         },
    //         set: function(novi){
    //             this.novaKnjiga = {...novi};
    //         }
    //     }
    // },

    watch: {
        knjiga: function(newValue, oldValue){
            this.novaKnjiga = {...this.knjiga};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKnjiga})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="novaKnjiga.naziv" required>
    <div class="form-text"><i>Uneti naziv knjige</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Autor: </label>
    <input type="text" class="form-control" v-model="novaKnjiga.autor" required>
    <div class="form-text"><i>Uneti autora</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Kategorija: </label>
    <input type="text" class="form-control" v-model="novaKnjiga.kategorija" required>
    <div class="form-text"><i>Uneti kategoriju(žanr)</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control" v-model="novaKnjiga.cena" required>
    <div class="form-text"><i>Uneti cenu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Stanje: </label>
    <select class="form-select" v-model="novaKnjiga.stanje" required>
        <option value="DA">Da</option>
        <option value="NE">Ne</option>
    </select>
    <div class="form-text"><i>Izaberi</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Biblioteka ID: </label>
    <select class="form-select" v-model="novaKnjiga.biblioteka_id" required>
        <option v-for="biblioteka in biblioteke" :value="biblioteka.id">-{{biblioteka.naziv}}, {{biblioteka.adresa}}, {{biblioteka.telefon}}, {{biblioteka.email}}</option>
    </select>
    <div class="form-text"><i>Izaberi biblioteku</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}