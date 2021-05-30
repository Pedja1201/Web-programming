////Prikaz tabele dostupnih biblioteka(Podaci i kontakt)
export default {
    template:`
    <p><b>-Dostupne biblioteke: </b></p>

    <table class="table table-success table-striped w-75 p-3">
    <thead>
        <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>adresa</th>
            <th>Telefon</th>
            <th>E-mail</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="biblioteka in biblioteke">
            <td>{{biblioteka.id}}</td>
            <td>{{biblioteka.naziv}}</td>
            <td>{{biblioteka.adresa}}</td>
            <td>{{biblioteka.telefon}}</td>
            <td>{{biblioteka.email}}</td>
            
        </tr>
    </tbody>
    </table>
    `,
    data(){
        return {
            biblioteke: {},
        }
    },
    methods:{
        refresh(){
            //saljem this van funkcije da obuhvata sve//
             axios.get("api/biblioteke").then((response) => {
                 this.biblioteke = response.data;
             });
         },
        
    },

    
    created(){
        this.refresh();

    }
}