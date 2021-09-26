export default {
    props: ["profesori", "naslov"],
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
        <th>Ime</th>
        <th>Prezime</th>
        <th>E-mail</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="profesor in profesori">
        <td>{{profesor.id}}</td>
        <td>{{profesor.ime}}</td>
        <td>{{profesor.prezime}}</td>
        <td>{{profesor.email}}</td>
        <td><button class="btn btn-light me-3" v-on:click="$emit('uklanjanje', profesor.id)">Ukloni</button>
            <button class="btn btn-light" v-on:click="$emit('izmena', {...profesor})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
