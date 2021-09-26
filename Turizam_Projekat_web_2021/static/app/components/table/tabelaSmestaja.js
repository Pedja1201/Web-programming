export default {
    props: ["smestaji", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-warning table-striped table-bordered border-warning">
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Mesto</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="smestaj in smestaji">
        <td>{{smestaj.id}}</td>
        <td>{{smestaj.naziv}}</td>
        <td>{{smestaj.mesto}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', smestaj.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...smestaj})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `,
    
}