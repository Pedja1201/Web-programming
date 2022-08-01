export default {
    props: ["student", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviStudent: this.student ? this.student : {}
        }
    },


    watch: {
        student: function(newValue, oldValue){
            this.noviStudent = {...this.student};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviStudent})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control" v-model="noviStudent.ime" required>
</div>
<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control" v-model="noviStudent.prezime" required>
</div>
<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control" v-model="noviStudent.email" required>
</div>
<div class="mb-3">
    <label class="form-label">Lozinka: </label>
    <input type="password" class="form-control" v-model="noviStudent.lozinka" required>
</div>
<div>
    <input type="submit" class="btn btn-success" v-bind:value="dugme">
</div>
</form>
    `

}