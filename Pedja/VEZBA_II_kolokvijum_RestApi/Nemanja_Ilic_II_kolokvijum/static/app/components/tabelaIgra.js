export default {
    props: ["igre"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Zanr</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="igra in igre">
        <td>{{igra.id}}</td>
        <td>{{igra.naziv}}</td>
        <td>{{igra.zanr}}</td>
        <td><button v-on:click="$emit('uklanjanje', igra.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...igra})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
