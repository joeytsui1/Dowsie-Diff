class Modals {
    constructor(buttonName) {
        this.modal = document.getElementById(buttonName)
        this.check()
        this.handleClick = this.handleClick.bind(this)
        this.modal.addEventListener("click", this.handleClick)
        this.modal.style.display = 'none'
    }

    check() {
        console.log(this.modal)
    }
    handleClick(e) {
        e.preventDefault()
        if (this.modal.style.display === 'none') {
            this.modal.style.display = 'block'
        }
        else {
            this.modal.style.display = 'none'
        }
    }
}

// export default Modals
 // modal.style.display = 'block'
        // backdrop.style.display = 'block'