
class MenuElement {

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
            this.Onclick()
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

    MakeSelected() {
        this.selected = !this.selected
        this.Select(this.OnArrayRequest())
        $('.content').load(this.pageUrl)
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

class Mod {
    /*

    <div class="description">
        <h1>Kopernicus</h1>
        <span class="version">v1.14</span>
        <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique infor...</p>
        
        <a href="#" class="button orange">Install</a>
        <a href="#" class="button gray">View more</a>
    </div>

    */
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
    }
}

var menuElements = [
    new MenuElement({
        title: 'Mods', 
        page: '/Pages/Mods.html'
    }),

    new MenuElement({
        title: 'Installed', 
        page: '/Pages/Installed.html',
        badge: '180'
    }),

    new MenuElement({
        title: 'Settings', 
        page: '/Pages/Settings.html'
    })
]

$(document).ready(function(){

    // Initialise les éléments du menu de gauche
    menuElements.forEach( (x) => {
        x.OnArrayRequest = () => { return menuElements }
        $('.side-bar-content').append(x.GetElement())
    })

    // Selectionne le premier elements du menu de gauche
    menuElements[0].MakeSelected()

});