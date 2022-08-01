////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-50 p-3">
<p><b>-Izmena studenta</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control" v-model="student.ime" required>
</div>
<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control" v-model="student.prezime" required>
</div>
<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control" v-model="student.email" required>
</div>
<div class="mb-3">
    <label class="form-label">Lozinka: </label>
    <input type="text" class="form-control" v-model="student.lozinka" required>
</div>
<div>
    <input type="submit" class="btn btn-info" v-bind:value="'Izmeni'">
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
            axios.get(`api/studenti/${this.$route.params['id']}`).then((response) => {
                this.student = response.data;
            });
        },
        update(){
            axios.put(`api/studenti/${this.$route.params['id']}`, this.student).then((response) => {
                this.$router.push("/studenti");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}