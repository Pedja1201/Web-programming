////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena profesora</b></p>

<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control" v-model="profesor.ime" required>
</div>

<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control" v-model="profesor.prezime" required>
</div>

<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control" v-model="profesor.email" required>
</div>

<div>
    <input type="submit" class="btn btn-info" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            profesor: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/profesori/${this.$route.params['id']}`).then((response) => {
                this.profesor = response.data;
            });
        },
        update(){
            axios.put(`api/profesori/${this.$route.params['id']}`, this.profesor).then((response) => {
                this.$router.push("/profesori");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}