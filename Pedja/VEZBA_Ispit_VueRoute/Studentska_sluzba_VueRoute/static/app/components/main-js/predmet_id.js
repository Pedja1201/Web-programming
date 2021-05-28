////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena predmeta</b></p>
<div>
    <label>ID: </label>
    <input type="text" v-model="predmet.id" required></div>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="predmet.naziv" required></div>
<div>
    <label>Profesor: </label>
    <input type="text" v-model="predmet.profesor" required></div>
<div>
    <label>ESPB: </label>
    <input type="number" v-model="predmet.espb" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            predmet: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/predmeti/${this.$route.params['id']}`).then((response) => {
                this.predmet = response.data;
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