export default {
    props: ["automobili", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped table-dark">
<thead>
    <tr>
        <th>ID</th>
        <th>Registarski broj</th>
        <th>Marka</th>
        <th>Model</th>
        <th>Zapremina motora</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="auto in automobili">
        <td>{{auto.id}}</td>
        <td>{{auto.registarski_broj}}</td>
        <td>{{auto.marka}}</td>
        <td>{{auto.model}}</td>
        <td>{{auto.zapremina_motora}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', auto.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...auto})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}