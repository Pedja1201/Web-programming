//Korisnik
import TabelaKorisnika from './components/table/tabelaKorisnika.js'
import KorisnikForma from './components/forma/korisnikForma.js'


import TabelaKonzole from './components/table/tabelaKonzole.js'
import KonzolaForma from './components/forma/konzolaForma.js'

import TabelaKorpe from './components/table/tabelaKorpe.js'
import KorpaForma from './components/forma/korpaForma.js'



import TabelaIgrice from './components/table/tabelaIgrice.js'
import IgricaForma from './components/forma/IgricaForma.js'

import Korisnici from './components/main/korisnici.js'
import KorisnikId from './components/main/korisnik_id.js'

import Konzole from './components/main/konzole.js'
import KonzolaId from './components/main/konzola_id.js'

import Korpe from './components/main/korpe.js'
import KorpaId from './components/main/korpa_id.js'


import Igrice from './components/main/igrice.js'
import IgricaId from './components/main/igrica_id.js'

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

        {path: "/konzole", component: Konzole},///Prikaz za stranice
        {path: "/konzole/:id", component: KonzolaId},///Prikaz za stranice


        {path: "/korpe", component: Korpe},///Prikaz za stranice
        {path: "/korpe/:id", component: KorpaId},//Pojedinacan prikaz

    
        {path: "/igrice", component: Igrice},///Prikaz za stranice
        {path: "/igrice/:id", component: IgricaId},//Pojedinacan prikaz

        
        
    ],
});

const app = Vue.createApp({});
app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.component('tabela-konzole', TabelaKonzole);
app.component('konzola-forma', KonzolaForma);

app.component('tabela-korpe', TabelaKorpe);
app.component('korpa-forma', KorpaForma);


app.component('tabela-igrice', TabelaIgrice);
app.component('igrica-forma', IgricaForma);

app.use(router);
app.mount("#app");
