export default {
    props: ["knjige", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
    <p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Naslov</th>
        <th>Autor</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="knjiga in knjige">
        <td>{{knjiga.id}}</td>
        <td>{{knjiga.naslov}}</td>
        <td>{{knjiga.autor}}</td>
        <td><button v-on:click="$emit('uklanjanje', knjiga.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...knjiga})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
