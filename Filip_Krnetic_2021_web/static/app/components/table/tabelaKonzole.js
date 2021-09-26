export default {
    props: ["konzole", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped">
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="konzola in konzole">
        <td>{{konzola.id}}</td>
        <td>{{konzola.naziv}}</td>
        
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', konzola.id)">Ukloni</button>
            <button class="btn btn-success" v-on:click="$emit('izmena', {...konzola})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}