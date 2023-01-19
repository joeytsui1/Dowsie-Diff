class ChampionModal {
    constructor() {
        this.modalLink = document.getElementById("modal-link")
        this.modal = document.getElementById("myModal")
        this.overlay = document.querySelector(".overlay")
        this.span = document.getElementsByClassName("close")[0]

        this.openModal = this.openModal.bind(this)
        this.modalLink.addEventListener("click", this.openModal)

        this.closeModal = this.closeModal.bind(this)
        this.span.addEventListener('click', this.closeModal)
    }

    openModal (e) {
        e.preventDefault()
        this.modal.style.display = "block"
        this.overlay.classList.remove("hidden");
    }

    closeModal(e) {
        e.preventDefault()
        this.modal.style.display = "none"
        this.overlay.classList.add("hidden");
    }
}

export default ChampionModal