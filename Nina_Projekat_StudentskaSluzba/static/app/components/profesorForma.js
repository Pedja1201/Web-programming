export default {
    props: ["profesor", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviProfesor: this.profesor ? this.profesor : {}
        }
    },
    
    watch: {
        profesor: function(newValue, oldValue){
            this.noviProfesor = {...this.profesor};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviProfesor})">
<p><b>-{{naslov}}</b></p>

<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control" v-model="noviProfesor.ime" required>
</div>

<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control" v-model="noviProfesor.prezime" required>
</div>

<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control" v-model="noviProfesor.email" required>
</div>

<div>
    <input type="submit" class="btn btn-success" v-bind:value="dugme">
</div>
</form>
    `

}