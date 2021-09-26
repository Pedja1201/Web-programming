export default {
    props: ["rakija", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaRakija: this.rakija ? this.rakija : {}
        }
    },


    watch: {
        rakija: function(newValue, oldValue){
            this.novaRakija = {...this.rakija};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaRakija})" class="p-3">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="novaRakija.naziv" required>
    <div class="form-text"><i>Uneti naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Sorta: </label>
    <input type="text" class="form-control" v-model="novaRakija.sorta" required>
    <div class="form-text"><i>Uneti sortu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control" v-model="novaRakija.cena" required>
    <div class="form-text"><i>Uneti cenu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Godina: </label>
    <input type="number" class="form-control" v-model="novaRakija.godina" required>
    <div class="form-text"><i>Uneti godinu</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}