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
<div>
    <label>Student(Indeks): </label>
    <select v-model="novoPolaganje.student_brojIndeksa" required>
        <option v-for="student in studenti" :value="student.brojIndeksa">{{student.brojIndeksa}},{{student.ime}},{{student.prezime}},{{student.email}}</option>
    </select>
</div>
<div>
    <label>Predmet ID: </label>
    <select v-model="novoPolaganje.predmet_id" required>
        <option v-for="predmet in predmeti" :value="predmet.id">{{predmet.naziv}},{{predmet.profesor}},{{predmet.espb}}</option>
    </select>
</div>

<div>
    <label>Datum: </label>
    <input type="datetime-local" v-model="novoPolaganje.datum" required></div>
<div>
    <label>Ocena: </label>
    <input type="number" v-model="novoPolaganje.ocena" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}