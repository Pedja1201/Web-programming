export default {
    props: ["nikeShop"],
    emits: ["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Odeca</th>
        <th>Obuca</th>
        <th>Velicina</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="nike in nikeShop">
        <td>{{nike.id}}</td>
        <td>{{nike.odeca}}</td>
        <td>{{nike.obuca}}</td>
        <td>{{nike.velicina}}</td>
        <td><button v-on:click="$emit('uklanjanje', nike.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...nike})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}

