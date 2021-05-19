 export default {
    props: ["prijavljen"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Oznaka korisnika</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="prijava in prijavljen">
        <td>{{prijava.id}}</td>
        <td>{{prijava.korisnik_oznaka}}</td>
        <td><button v-on:click="$emit('uklanjanje', prijava.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...prijava})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}