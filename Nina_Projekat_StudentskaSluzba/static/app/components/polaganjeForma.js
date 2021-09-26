export default {
    props: ["polaganje", "dugme", "naslov", "studenti", "predmeti"],
    emits : ["sacuvaj"],
    data(){
        return{
            novoPolaganje: this.polaganje ? this.polaganje : {}
        }
    },


    watch: {
        polaganje: function(newValue, oldValue){
            this.novoPolaganje = {...this.polaganje};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novoPolaganje})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Student ID: </label>
    <select class="form-select" v-model="novoPolaganje.student_id" required>
        <option v-for="student in studenti" :value="student.id">-{{student.ime}}, {{student.prezime}}, {{student.email}}</option>
    </select>
    <div class="form-text"><i>Izaberi studenta</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Predmet ID: </label>
    <select class="form-select" v-model="novoPolaganje.predmet_id" required>
        <option v-for="predmet in predmeti" :value="predmet.id">-{{predmet.naziv}}, {{predmet.profesor_id}}, {{predmet.espb}} espb</option>
    </select>
    <div class="form-text"><i>Izaberi predmet</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum: </label>
    <input type="datetime-local" class="form-control" v-model="novoPolaganje.datum" required>
</div>
<div class="mb-3">
    <label class="form-label">Ocena: </label>
    <input type="number" class="form-control" v-model="novoPolaganje.ocena" required>
</div>
<div>
    <input type="submit" class="btn btn-success" v-bind:value="dugme">
</div>
</form>
    `

}