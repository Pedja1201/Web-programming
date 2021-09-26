////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena polaganja</b></p>
<div class="mb-3">
    <label class="form-label">Student ID: </label>
    <select class="form-select" v-model="polaganje.student_id" required>
        <option v-for="student in studenti" :value="student.id">-{{student.ime}}, {{student.prezime}}, {{student.email}}</option>
    </select>
    <div class="form-text"><i>Izaberi studenta</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Predmet ID: </label>
    <select class="form-select" v-model="polaganje.predmet_id" required>
        <option v-for="predmet in predmeti" :value="predmet.id">-{{predmet.naziv}}, {{predmet.profesor_id}}, {{predmet.espb}} espb</option>
    </select>
    <div class="form-text"><i>Izaberi predmet</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum: </label>
    <input type="datetime-local" class="form-control" v-model="polaganje.datum" required>
</div>
<div class="mb-3">
    <label class="form-label">Ocena: </label>
    <input type="number" class="form-control" v-model="polaganje.ocena" required>
</div>

<div>
    <input type="submit" class="btn btn-info" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            polaganje: {},
            studenti:{}, ///za select
            predmeti:{},///za select
        }
    },
    methods:{
        refresh(){
            axios.get(`api/polaganja/${this.$route.params['id']}`).then((response) => {
                ////Datum ISO format
                response.data.datum = new Date(response.data.datum).toISOString().split("Z")[0];

                this.polaganje = response.data;
            });
            ///Select opcija-novo!!!!
            axios.get("api/studenti").then((response) => {
                this.studenti = response.data;
            });
            axios.get("api/predmeti").then((response) => {
                this.predmeti = response.data;
            });
        },
        update(){
            axios.put(`api/polaganja/${this.$route.params['id']}`, this.polaganje).then((response) => {
                this.$router.push("/polaganja");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}