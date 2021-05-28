////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena Nike</b></p>
<div>
    <label>Odeca:</label>
    <input type="text" v-model="nike.odeca" required>
</div>
<div>
    <label>Obuca:</label>
    <input type="text" v-model="nike.obuca" required>
</div>
<div>
    <label>Velicina:</label>
    <input type="text" v-model="nike.velicina" required>
</div>

    <div>
        <input type="submit" v-bind:value="'Izmeni'">
    </div>
</form>
    `,
    data(){
        return {
            nike:{},
    
        }
    },
    methods:{
        refresh(){
            axios.get(`api/nike/${this.$route.params['id']}`).then((response) => {
                this.nike = response.data;
            });
        },
        update(){
            axios.put(`api/nike/${this.$route.params['id']}`, this.nike).then((response) => {
                this.$router.push("/nike");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}