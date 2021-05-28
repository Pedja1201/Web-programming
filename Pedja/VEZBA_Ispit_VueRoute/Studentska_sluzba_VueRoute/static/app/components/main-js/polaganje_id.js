////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena polaganja</b></p>
<div>
    <label>Student(Indeks): </label>
    <select v-model="polaganje.student_brojIndeksa" required>
        <option v-for="student in studenti" :value="student.brojIndeksa">{{student.brojIndeksa}},{{student.ime}},{{student.prezime}},{{student.email}}</option>
    </select>
</div>
<div>
    <label>Predmet ID: </label>
    <select v-model="polaganje.predmet_id" required>
        <option v-for="predmet in predmeti" :value="predmet.id">{{predmet.naziv}},{{predmet.profesor}},{{predmet.espb}}</option>
    </select>
</div>

<div>
    <label>Datum: </label>
    <input type="datetime-local" v-model="polaganje.datum" required></div>
<div>
    <label>Ocena: </label>
    <input type="number" v-model="polaganje.ocena" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
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