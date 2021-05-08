export default {
    props: ["blagajne"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Cena</th>
        <th>ID-Karta</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="blagajna in blagajne">
        <td>{{blagajna.id}}</td>
        <td>{{blagajna.cena}}</td>
        <td>{{blagajna.karta_id}}</td>
        <td><button v-on:click="$emit('uklanjanje', blagajna.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...blagajna})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}