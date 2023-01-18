class Hover {
    constructor(ele){
        this.ele = document.getElementById(ele)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.ele.addEventListener('mouseover', this.handleMouseOver)
    }

    handleMouseOver(e){
        e.preventDefault()
        alert(this.ele.title)
    }
}

export default Hover