////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena Auta</b></p>
<div>
    <label>Tablice:</label>
    <input type="text" v-model="auto.tablice" required>
</div>
<div>
    <label>Marka:</label>
    <input type="text" v-model="auto.marka" required>
</div>
<div>
    <label>Model:</label>
    <input type="text" v-model="auto.model" required>
</div>
<div>
    <label>Godiste:</label>
    <input type="datetime-local" v-model="auto.godiste" required>
</div>

    <div>
        <input type="submit" v-bind:value="'Izmeni'">
    </div>
</form>
    `,
    data(){
        return {
            auto:{},
           
        }
    },
    methods:{
        refresh(){
            axios.get(`api/auto/${this.$route.params['tablice']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.godiste = new Date(response.data.godiste).toISOString().split("Z")[0];
                
                this.auto = response.data;
            });
        },
        update(){
            axios.put(`api/auto/${this.$route.params['tablice']}`, this.auto).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}