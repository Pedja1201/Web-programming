export default {
    props: ["skole"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Ime skole</th>
        <th>Adresa</th>
        <th>ID-Nastavnika</th>
        <th>ID-Predmeta</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="skola in skole">
        <td>{{skola.id}}</td>
        <td>{{skola.ime_skole}}</td>
        <td>{{skola.adresa}}</td>
        <td>{{skola.nastavnik_licni_id}}</td>
        <td>{{skola.predmet_id}}</td>
        <td><button v-on:click="$emit('uklanjanje', skola.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...skola})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}