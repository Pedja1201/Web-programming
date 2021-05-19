export default {
    props: ["polaganja"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Student(Indeks)</th>
        <th>Predmet ID</th>
        <th>Datum</th>
        <th>Ocena</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="polaganje in polaganja">
        <td>{{polaganje.id}}</td>
        <td>{{polaganje.student_brojIndeksa}}</td>
        <td>{{polaganje.predmet_id}}</td>
        <td>{{polaganje.datum}}</td>
        <td>{{polaganje.ocena}}</td>
        <td><button v-on:click="$emit('uklanjanje', polaganje.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...polaganje})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
