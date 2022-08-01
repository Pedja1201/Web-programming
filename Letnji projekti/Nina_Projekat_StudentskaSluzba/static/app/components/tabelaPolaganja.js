export default {
    props: ["polaganja", "naslov"],
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
        <th>Student ID</th>
        <th>Predmet ID</th>
        <th>Datum</th>
        <th>Ocena</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="polaganje in polaganja">
        <td>{{polaganje.id}}</td>
        <td>{{polaganje.student_id}}</td>
        <td>{{polaganje.predmet_id}}</td>
        <td>{{polaganje.datum}}</td>
        <td>{{polaganje.ocena}}</td>
        <td><button class="btn btn-light me-3" v-on:click="$emit('uklanjanje', polaganje.id)">Ukloni</button>
            <button class="btn btn-light" v-on:click="$emit('izmena', {...polaganje})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
