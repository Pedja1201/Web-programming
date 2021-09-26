export default {
    props: ["turisti", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped table-info table-bordered border-primary">
<thead>
    <tr>
        <th>ID</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Datum rođenja</th>
        <th>Matični broj</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="turista in turisti">
        <td>{{turista.id}}</td>
        <td>{{turista.ime}}</td>
        <td>{{turista.prezime}}</td>
        <td>{{turista.datum_rodjenja}}</td>
        <td>{{turista.maticni_broj}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', turista.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...turista})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}