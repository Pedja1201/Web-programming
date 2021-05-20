export default {
    props: ["osiguravajuceKuce"],
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
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="kuca in osiguravajuceKuce">
        <td>{{kuca.id}}</td>
        <td>{{kuca.naziv}}</td>
        <td><button v-on:click="$emit('uklanjanje', kuca.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...kuca})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}