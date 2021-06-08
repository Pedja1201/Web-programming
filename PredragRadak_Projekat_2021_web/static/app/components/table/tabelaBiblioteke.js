export default {
    props: ["biblioteke", "naslov"],
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
        <th>Adresa</th>
        <th>Telefon</th>
        <th>E-mail</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="biblioteka in biblioteke">
        <td>{{biblioteka.id}}</td>
        <td>{{biblioteka.naziv}}</td>
        <td>{{biblioteka.adresa}}</td>
        <td>{{biblioteka.telefon}}</td>
        <td>{{biblioteka.email}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', biblioteka.id)">Ukloni</button>
            <button class="btn btn-info" v-on:click="$emit('izmena', {...biblioteka})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}