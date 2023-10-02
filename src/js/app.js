import '../scss/app.scss'

const serverTemplate = document.querySelector('#server-template');
const serverHolder = document.querySelector('#server-holder');

//Je crée un tableau vide qui contiendra tous les serveurs
let servers = [];

const handleClick = event => {
    window.alert('✅ Serveur ajouté aux favoris !')
    if (event.currentTarget.classList.contains('favorite')) event.currentTarget.remove('favorite')
    else event.currentTarget.classList.add('favorite');
}

for (let i = 0; i < 25; i++) {
    //Je clone ici mon template de serveur, afin de pouvoir le dupliquer
    let clone = document.importNode(serverTemplate.content, true);

    //Je viens ici faire une série de querySelector pour pouvoir manipuler mes données de façon dynamique
    let server = clone.querySelector('.server');
    let title = clone.querySelector('.server-title');
    let status = clone.querySelector('.status');
    let cpu = clone.querySelector('.cpu');
    let memory = clone.querySelector('.memory');
    let btn = clone.querySelector('button');

    //J'attribue un ID à chaque serveur
    server.setAttribute('id', `server-${i}`);

    //Le nom du serveur est attribué par rapport à son ID de boucle
    title.innerText = `Serveur ${i + 1}`;

    //J'attribue aléatoirement la valeur "online" ou offline. "Online" a 80% de chance d'apparaître
    if (Math.random() < 0.8) status.innerText = '✅ Online';
    else status.innerText = '❌ Offline';

    //J'attribue des valeurs aléatoires d'utilisation RAM et CPU
    memory.innerText = `Memoire: ${Math.floor(Math.random() * 32)}Go / 32Go`
    cpu.innerText = `CPU: ${Math.floor(Math.random() * 101)}%`

    //J'ajoue un eventListener pour ajouter une fonctionnalité au bouton favoris
    btn.addEventListener('click', handleClick)

    //Je pousse chaque serveur dans le tableau "servers"
    servers.push(clone);
}

//Cette boucle va venir ajouter chaque serveur au div "server-holder" du DOM
for (let server of servers) {
    serverHolder.appendChild(server);
}