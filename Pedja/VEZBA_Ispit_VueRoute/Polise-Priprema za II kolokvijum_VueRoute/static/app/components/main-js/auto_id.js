////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena automobila</b></p>
<div>
    <label>Registarski broj: </label>
    <input type="text" v-model="auto.registarski_broj" required></div>
<div>
    <label>Marka: </label>
    <input type="text" v-model="auto.marka" required></div>
<div>
    <label>Model: </label>
    <input type="text" v-model="auto.model" required></div>
<div>
    <label>Zapremina motora: </label>
    <input type="number" v-model="auto.zapremina_motora" required></div>
<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            auto: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/automobili/${this.$route.params['id']}`).then((response) => {
               this.auto = response.data;
            });
        },
        update(){
            axios.put(`api/automobili/${this.$route.params['id']}`, this.auto).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}