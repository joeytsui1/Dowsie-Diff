class AboutModal {
    constructor() {
        this.modal = document.querySelector(".modals")
        this.overlay = document.querySelector(".overlay")
        this.openModalBtn = document.querySelector(".btn-open")
        this.closeModalBtn = document.querySelector(".btn-close")


        this.openModal = this.openModal.bind(this)
        this.openModalBtn.addEventListener("click", this.openModal)

        this.closeModal = this.closeModal.bind(this)
        this.closeModalBtn.addEventListener("click", this.closeModal)

    }

    openModal(e) {
        e.preventDefault()
        this.modal.classList.remove("hidden");
        this.overlay.classList.remove("hidden");
    };

    closeModal(e) {
        e.preventDefault()
        this.modal.classList.add("hidden");
        this.overlay.classList.add("hidden");
    };

}

export default AboutModal
