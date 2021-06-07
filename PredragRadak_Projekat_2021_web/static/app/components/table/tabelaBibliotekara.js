export default {
    props: ["bibliotekari", "naslov"],
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
        <th>Korisnicko ime</th>
        <th>Lozinka</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="bibliotekar in bibliotekari">
        <td>{{bibliotekar.id}}</td>
        <td>{{bibliotekar.korisnicko_ime}}</td>
        <td>{{bibliotekar.lozinka}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', bibliotekar.id)">Ukloni</button>
            <button class="btn btn-info" v-on:click="$emit('izmena', {...bibliotekar})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `,
    
}