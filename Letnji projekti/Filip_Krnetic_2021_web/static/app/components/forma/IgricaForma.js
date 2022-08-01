export default {
    props: ["igrice", "dugme", "naslov", "konzole"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaIgrica: this.igrice ? this.igrice : {}
        }
    },


    watch: {
        igrice: function(newValue, oldValue){
            this.novaIgrica = {...this.igrice};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaIgrica})" class="p-3">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="novaIgrica.naziv" required>
    <div class="form-text"><i>Uneti naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control" v-model="novaIgrica.cena" required>
    <div class="form-text"><i>Uneti cenu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Žanr: </label>
    <input type="text" class="form-control" v-model="novaIgrica.zanr" required>
    <div class="form-text"><i>Uneti žanr</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Konzola ID: </label>
    <select class="form-select" v-model="novaIgrica.konzola_id" required>
        <option v-for="konzola in konzole" :value="konzola.id">-{{konzola.naziv}}</option>
    </select>
    <div class="form-text"><i>Izaberi konzolu</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}