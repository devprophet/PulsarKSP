
class PSMenuElement {

    constructor(options) {
        this.element = document.createElement('a')
        this.element.setAttribute('href', '#')

        this.elementBadge = document.createElement('span')
        this.elementBadge.setAttribute('class', 'bubble')

        if('title' in options) {
            this.title = options.title
        } else {
            this.title = 'None'
        }

        if('selected' in options) {
            this.selected = options.selected
        } else {
            this.selected = false
        }

        if('badge' in options) {
            this.badgeValue = options.badge
        } else {
            this.badgeValue = ''
        }

        this.OnArrayRequest = () => {}
        this.OnClick = () => {}

        this.element.onclick = () => {
            this.MakeSelected()
            this.OnClick()
        }

        if('page' in options) {
            this.pageUrl = __dirname + options.page
        } else {
            this.pageUrl = __dirname + '/Pages/nopage.html'
        }
    }

    Update() {
        this.element.text = this.title
        this.elementBadge.innerText = this.badgeValue
        if(this.selected) {
            this.element.setAttribute('class', 'selected')
        } else {
            this.element.removeAttribute('class')
        }
        if(this.badgeValue != '') {
            this.element.appendChild(this.elementBadge)
        }
    }

    GetElement() {
        this.Update()
        return this.element
    }

    MakeSelected( OnComplete ) {
        this.selected = !this.selected
        this.Select(this.OnArrayRequest())
        $('.content').load(this.pageUrl, OnComplete)
    }

    Select(other) {
        other.forEach((e) => {
            if(e.element != this) {
                e.selected = false
                e.Update()
            }
        })

        this.selected = true
        this.Update()
    }
}

class PSMod {
    constructor(options) {

        // ----------------
        // Le titre du mod
        // ----------------
        if('title' in options) {
            this.title = options.title
        } else {
            this.title = 'No title'
        }

        // ----------------
        // La description courte du mod
        // ----------------
        if('shortDescription' in options) {
            this.shortDescription = options.shortDescription
        } else {
            this.shortDescription = 'No description in this mod... Please complete that!'
        }

        // ----------------
        // La description complete du mod
        // ----------------
        if('completeDescription' in options) {
            this.completeDescription = options.completeDescription
        } else {
            this.completeDescription = 'No complete description in this mod... Please complete that!'
        }

        // ----------------
        // Le lien de télechargement du mod
        // ----------------
        if('downloadLink' in options) {
            this.downloadLink = options.downloadLink
        } else {
            this.downloadLink = 'none'
        }
        
        // ----------------
        // La version de KSP compatible avec le mod
        // ----------------
        if('versionKSP' in options) {
            this.versionKSP = options.versionKSP
        } else {
            this.versionKSP = '0.0'
        }

    }

    /**
     * Convertie l'object en code html et l'ajoute directement
     * @param {string} buildMod peut prendre la valeur `"short"` pour la description courte et `"long"` pour la description longue
     * @returns {HTMLDivElement} L'élément html construit
     */
    Build(buildMod) {
        if(buildMod === 'short') {
            var element = document.createElement('div')
            element.setAttribute('class', 'description')

            var title = document.createElement('h1')
            title.innerText = this.title

            var version = document.createElement('span')
            version.setAttribute('class', 'version')
            version.innerText = this.versionKSP

            var description = document.createElement('p')
            description.innerText = this.shortDescription

            var download = document.createElement('a')
            download.setAttribute('class', 'button orange')
            download.innerText = 'Install'

            var more = document.createElement('a')
            more.setAttribute('class', 'button gray')
            more.innerText = 'View more'

            element.appendChild(title)
            element.appendChild(version)
            element.appendChild(description)
            element.appendChild(download)
            element.appendChild(more)

            return element
        }
    }
}

class PSSearchBar {

    // <input type="text" placeholder="Mod name, categorie, etc...">
    /**
     * 
     * @param {string} placeholder Le text qui et marquer dans la searchbar
     * @param {function(Element, string)} OnInputChange Appelle cette fonction lorsque l'utilisateur appuie sur une touche.
     * @returns {HTMLDivElement} La search bar
     */
    Build(placeholder, OnInputChange) {
        let element = document.createElement('input')
        element.setAttribute('type', 'text')
        element.setAttribute('placeholder', placeholder == null || placeholder == '' ? 'no placeholder' : placeholder)
        element.oninput = (e) =>{
            // console.log(e.srcElement.value)
            if(OnInputChange != null) {
                OnInputChange(e.srcElement, e.srcElement.value)
            }
        }
        return element;
    }

}

var menuElements = [
    new PSMenuElement({
        title: 'Mods', 
        page: '/Pages/Mods.html'
    }),

    new PSMenuElement({
        title: 'Installed', 
        page: '/Pages/Installed.html',
        badge: '180'
    }),

    new PSMenuElement({
        title: 'Settings', 
        page: '/Pages/Settings.html'
    })
]

let mod = new PSMod(
    {
        title: 'Je suis un titre',
        shortDescription: 'Je suis une description courte',
        completeDescription: 'Je suis une description complete du mod',
        downloadLink: 'http://www.google.fr/',
        versionKSP: '1.14',
        Author: 'Alexis'
    }
)

// Pour la base de donnés
let MongoClient = require('mongodb').MongoClient

// Pour la convertion markdown -> HTML
let Showdown = require('showdown')

// Le convertisseur MD -> HTML
let ShowdownConverter = new Showdown.Converter()

// L'url de la base de donné
let uri = "mongodb+srv://" + escape('alex-sb') + ":" + escape('RiZaZXc630TzSD7T') + "@cluster0-woa89.gcp.mongodb.net/KSPModManagerDB";


$(document).ready(function(){

    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
        if(err) throw err
        console.log('Connected to the DB!')
        
        client.db('KSPMMApp').collection('Mods').find().forEach((e) => {
            console.log(e)
        })

        client.close()
        console.log('Close DB connection')
    })

    // Initialise les éléments du menu de gauche
    menuElements.forEach( (x) => {
        x.OnArrayRequest = () => { return menuElements }
        $('.side-bar-content').append(x.GetElement())
    })

    // Selectionne le premier elements du menu de gauche
    menuElements[0].MakeSelected( () => {
        
        /* on peut ajouter des elements ici... */
    })

});