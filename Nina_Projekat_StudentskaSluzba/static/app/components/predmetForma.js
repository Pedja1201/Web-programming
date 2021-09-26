export default {
    props: ["predmet", "dugme", "naslov", "profesori"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviPredmet: this.predmet ? this.predmet : {}
        }
    },


    watch: {
        predmet: function(newValue, oldValue){
            this.noviPredmet = {...this.predmet};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviPredmet})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="noviPredmet.naziv" required>
</div>

<div class="mb-3">
    <label class="form-label">Profesor ID: </label>
    <select class="form-select" v-model="noviPredmet.profesor_id" required>
        <option v-for="profesor in profesori" :value="profesor.id">-{{profesor.ime}}, {{profesor.prezime}}, {{profesor.email}}</option>
    </select>
    <div class="form-text"><i>Izaberi profesora</i></div>
<div class="mb-3">
    <label class="form-label">ESPB: </label>
    <input type="number" class="form-control" v-model="noviPredmet.espb" required>
</div>
<div>
    <input type="submit" class="btn btn-success" v-bind:value="dugme">
</div>
</form>
    `

}