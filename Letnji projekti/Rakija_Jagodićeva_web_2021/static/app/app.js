//Korisnik
import TabelaKorisnika from './components/table/tabelaKorisnika.js'
import KorisnikForma from './components/forma/korisnikForma.js'

//Turista
import TabelaKupaca from './components/table/tabelaKupaca.js'
import KupacForma from './components/forma/kupacForma.js'

//Aranzmani
import TabelaRakije from './components/table/tabelaRakije.js'
import RakijaForma from './components/forma/rakijaForma.js'



//Prodaja
import TabelaPorudzbine from './components/table/tabelaPorudzbine.js'
import PorudzbinaForma from './components/forma/porudzbinaForma.js'

////Razdvojene componenete u main
import Korisnici from './components/main/korisnici.js'
import KorisnikId from './components/main/korisnik_id.js'

import Kupci from './components/main/kupci.js'
import KupacId from './components/main/kupac_id.js'

import Rakije from './components/main/rakije.js'
import RakijaId from './components/main/rakija_id.js'


import Porudzbine from './components/main/porudzbine.js'
import PorudzbinaId from './components/main/porudzbina_id.js'

////Logovanje
import Login from './components/login/login.js'
import Logout from './components/login/logout.js'


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Login},///Prikaz za stranice
        {path: "/logout", component: Logout},///Prikaz za stranice

        {path: "/korisnici", component: Korisnici},///Prikaz za stranice
        {path: "/korisnici/:id", component: KorisnikId},//Pojedinacan prikaz

        {path: "/kupci", component: Kupci},///Prikaz za stranice
        {path: "/kupci/:id", component: KupacId},///Prikaz za stranice


        {path: "/rakije", component: Rakije},///Prikaz za stranice
        {path: "/rakije/:id", component: RakijaId},//Pojedinacan prikaz

    
        {path: "/porudzbine", component: Porudzbine},///Prikaz za stranice
        {path: "/porudzbine/:id", component: PorudzbinaId},//Pojedinacan prikaz

        
        
    ],
});

const app = Vue.createApp({});
app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.component('tabela-kupaca', TabelaKupaca);
app.component('kupac-forma', KupacForma);

app.component('tabela-rakije', TabelaRakije);
app.component('rakija-forma', RakijaForma);


app.component('tabela-porudzbine', TabelaPorudzbine);
app.component('porudzbina-forma', PorudzbinaForma);

app.use(router);
app.mount("#app");
