////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<div>
    <label>Naziv: </label>
    <input type="text" v-model="mesto.naziv" required></div>
<div>
    <input type="submit" v-bind:value="Izmeni">
</div>
</form>
    `,
    data(){
        return {
            mesto: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/radnaMesta/${this.$route.params['id']}`).then((response) => {
               this.mesto = response.data;
            });
        },
        update(){
            axios.put(`api/radnaMesta/${this.$route.params['id']}`, this.mesto).then((response) => {
                this.$router.push("/radnaMesta");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}