export default {
    props: ["aranzmani"],
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
        <th>Cena</th>
        <th>Datum polaska</th>
        <th>Broj dana</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="aranzman in aranzmani">
        <td>{{aranzman.id}}</td>
        <td>{{aranzman.naziv}}</td>
        <td>{{aranzman.cena}}</td>
        <td>{{aranzman.datum_polaska}}</td>
        <td>{{aranzman.broj_dana}}</td>
        <td><button v-on:click="$emit('uklanjanje', aranzman.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...aranzman})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}