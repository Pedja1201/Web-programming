////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena predmeta</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="predmet.naziv" required>
</div>

<div class="mb-3">
    <label class="form-label">Profesor ID: </label>
    <select class="form-select" v-model="predmet.profesor_id" required>
        <option v-for="profesor in profesori" :value="profesor.id">-{{profesor.ime}}, {{profesor.prezime}}, {{profesor.email}}</option>
    </select>
    <div class="form-text"><i>Izaberi profesora</i></div>
<div class="mb-3">
    <label class="form-label">ESPB: </label>
    <input type="number" class="form-control" v-model="predmet.espb" required>
</div>

<div>
    <input type="submit" class="btn btn-info" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            predmet: {},
            profesori: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/predmeti/${this.$route.params['id']}`).then((response) => {
                this.predmet = response.data;
            });

            axios.get("api/profesori").then((response) => {
                this.profesori = response.data;
            });
        },
        update(){
            axios.put(`api/predmeti/${this.$route.params['id']}`, this.predmet).then((response) => {
                this.$router.push("/predmeti");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}