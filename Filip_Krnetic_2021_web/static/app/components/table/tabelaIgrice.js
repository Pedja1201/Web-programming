export default {
    props: ["igrice", "naslov"],
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
        <th>Cena</th>
        <th>Žanr</th>
        <th>Konzola ID</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="igrica in igrice">
        <td>{{igrica.id}}</td>
        <td>{{igrica.naziv}}</td>
        <td>{{igrica.cena}}</td>
        <td>{{igrica.zanr}}</td>
        <td>{{igrica.konzola_id}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', igrica.id)">Ukloni</button>
            <button class="btn btn-success" v-on:click="$emit('izmena', {...igrica})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}