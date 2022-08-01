export default {
    props: ["predmeti", "naslov"],
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
        <th>Naziv</th>
        <th>Profesor ID</th>
        <th>ESPB</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="predmet in predmeti">
        <td>{{predmet.id}}</td>
        <td>{{predmet.naziv}}</td>
        <td>{{predmet.profesor_id}}</td>
        <td>{{predmet.espb}}</td>
        <td><button class="btn btn-light me-3" v-on:click="$emit('uklanjanje', predmet.id)">Ukloni</button>
            <button class="btn btn-light" v-on:click="$emit('izmena', {...predmet})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
