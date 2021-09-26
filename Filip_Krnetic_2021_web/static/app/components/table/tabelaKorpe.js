export default {
    props: ["korpe", "naslov"],
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
        <th>Igrica ID</th>
        <th>Količina</th>
        <th>Datum</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korpa in korpe">
        <td>{{korpa.id}}</td>
        <td>{{korpa.igrica_id}}</td>
        <td>{{korpa.kolicina}}</td>
        <td>{{korpa.datum}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', korpa.id)">Ukloni</button>
            <button class="btn btn-success" v-on:click="$emit('izmena', {...korpa})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}