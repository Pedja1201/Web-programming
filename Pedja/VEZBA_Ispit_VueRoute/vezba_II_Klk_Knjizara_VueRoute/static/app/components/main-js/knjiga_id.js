////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena knjige</b></p>
<div>
    <label>Naslov: </label>
    <input type="text" v-model="knjiga.naslov" required></div>
<div>
    <label>Autor: </label>
    <input type="text" v-model="knjiga.autor" required></div>
<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            knjiga: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/knjige/${this.$route.params['id']}`).then((response) => {
                this.knjiga = response.data;
            });
        },
        update(){
            axios.put(`api/knjige/${this.$route.params['id']}`, this.knjiga).then((response) => {
                this.$router.push("/knjige");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}