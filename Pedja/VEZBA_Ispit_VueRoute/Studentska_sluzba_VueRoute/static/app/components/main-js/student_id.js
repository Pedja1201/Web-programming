////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena studenta</b></p>
<div>
    <label>Broj Indeksa: </label>
    <input type="text" v-model="student.brojIndeksa" required></div>
<div>
    <label>Ime: </label>
    <input type="text" v-model="student.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="student.prezime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="student.email" required></div>
<div>
    <label>Lozinka: </label>
    <input type="text" v-model="student.lozinka" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            student: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/studenti/${this.$route.params['brojIndeksa']}`).then((response) => {
                this.student = response.data;
            });
        },
        update(){
            axios.put(`api/studenti/${this.$route.params['brojIndeksa']}`, this.student).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}