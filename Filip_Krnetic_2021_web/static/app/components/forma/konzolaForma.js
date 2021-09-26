export default {
    props: ["konzola", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKonzola: this.konzola ? this.konzola : {}
        }
    },


    watch: {
        konzola: function(newValue, oldValue){
            this.novaKonzola = {...this.konzola};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKonzola})"  class="p-3">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="novaKonzola.naziv" required>
    <div class="form-text"><i>Uneti naziv</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}