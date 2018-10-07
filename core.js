/*
// Pour la base de donnés
let MongoClient = require('mongodb').MongoClient

// Pour la convertion markdown -> HTML
let Showdown = require('showdown')

// Le convertisseur MD -> HTML
let ShowdownConverter = new Showdown.Converter()

// L'url de la base de donné
let uri = "mongodb+srv://" + escape('alex-sb') + ":" + escape('RiZaZXc630TzSD7T') + "@cluster0-woa89.gcp.mongodb.net/KSPModManagerDB";
*/
/**
 * 
 * @param {string} Title Le titre de la categorie.
 * @param {string} Description La description de la categorie.
 * @param {string} Version La verions de KSP supporter.
 * @param {string} Identifier L'identifiant de la categorie dans la base de donné.
 */
function AddCategorie(Title, Description, Version, Identifier) {
    // Crée le titre & l'assigne
    var title = document.createElement('h1')
    title.innerHTML += Title

    // Crée le sous-titre & l'assigne
    var subtitle = document.createElement('p')
    subtitle.className += 'gray'
    subtitle.innerHTML += Description
    
    // Crée la bulle de version & l'assigne
    var version = document.createElement('span')
    version.className += 'bubble' + ' orange'
    version.innerHTML = 'KSP ' + Version

    // Crée le parent qui contient tous les éléments ci-dessus
    var div = document.createElement('div')
    div.className = 'categorie'

    // Ajoutes les éléments
    div.appendChild(title)
    div.appendChild(subtitle)
    div.appendChild(version)

    // Crée le parent final qui content le parent du dessus & l'assigne
    var link = document.createElement('a')
    link.setAttribute('href', '#')
    link.id += 'menu-categorie'
    link.id += ' ' + Identifier
    link.appendChild(div)
    
    // S'execute lorque l'utilisateur clique sur cette categorie
    link.onclick = function() {
        console.log('The id equal to ' + Identifier)
    };

    // Ajoute la categorie au menu de gauche.
    $('.leftmenu').append(link)
}

function LoadCategories() {
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if(err) {
            console.log(err.message)
            throw err
        }
        
        console.log('Connected to db!')

        var indexs = db.db('KSPMMApp').collection('Mods').find().forEach( (element) => {
            console.log(element.Title)
            console.log(element.version)
            console.log(element.ShortDescription)
            console.log(element.Description)
            console.log(element.Author)
        })

        // Ne pas oublier de fermer la connexion a la base de donnée
        db.close()
        console.log('Disconnected to db')
    })
}

function AddLoader() {
    var loadingImage = document.createElement('img')
    loadingImage.setAttribute('src', 'img/loader_animation.gif')
    var element = document.createElement('div')
    element.setAttribute('class', 'loading')
    element.appendChild(loadingImage)
    $('body').append(element);
    $(element).fadeOut(0, ()=>{})
}

function ShowLoader(handler) {
    $('body').find('.loading').fadeIn('fast', ()=>{
        if(handler != null) {
            handler()
        }
    })
}

function HideLoader(handler) {
    $('body').find('.loading').fadeOut('fast', ()=>{
        if(handler != null) {
            handler()
        }
    })
}

/*

Titre
Description Courte
Description Longue
Date d'ajout
Auteur
Version de compatibilité de KSP
Lien de téléchargement (doit etre dans un zip)

*/