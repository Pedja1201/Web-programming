////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<div>
    <label>Ime: </label>
    <input type="text" v-model="radnik.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="radnik.prezime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="radnik.email" required></div>

<div>
    <input type="submit" v-bind:value="Izmeni">
</div>
</form>
    `,
    data(){
        return {
            radnik: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/radnici/${this.$route.params['id']}`).then((response) => {
               this.radnik = response.data;
            });
        },
        update(){
            axios.put(`api/radnici/${this.$route.params['id']}`, this.radnik).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}