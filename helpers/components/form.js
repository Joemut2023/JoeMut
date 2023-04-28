class BootstrapForm{
    #ressource = [];
    #data = [];
    #method = 'GET';
    #action;
    /**
     * 
     * @param {*} ressource 
     */
    constructor(ressource){
        this.#ressource = ressource;
    }
    
    /**
     * 
     * @param {*} name 
     * @param {*} type 
     * @param {*} label
     * @param {Object} options
     */
    input(options){
        this.#ressource.push(options)
        return /*html*/`
        <div class="mb-3">
            <label class="form-label">${options.label}</label>
            <input name="${options.name}" type="${options.type}" placeholder="${options.placeholder?options.placeholder:''}" class="form-control" ${options.attributes}>
        </div>`
    }
    /**
     * 
     * @param {*} options 
     * @param {*} label 
     */
    select(options){
        this.#ressource.push(options)
        return /*html*/`
        <select class="form-select" aria-label="Default select example">
            <option selected>${options}</option>
            ${options.items.map(option=>`<option value="${option.value}">${option.label}</option>`)}
        </select>`
    }
    /**
     * 
     * @param {*} name 
     * @param {*} label 
     */
    textarea(options){
        this.#ressource.push(options);
        return /*html*/`
        <div class="mb-3">
            <label class="form-label">${options.label}</label>
            <textarea class="form-control" rows="3"></textarea>
        </div>`
    }
    button(label){
        return `
            <button type="submit" class="btn btn-primary">${label}</button>
        `
    }
    /**
     * 
     * @returns 
     */
    generate(){
        return /*html*/`
        <form methode=${this.#method}>
            ${this.#ressource.map(ressource=>this[ressource.element](ressource))}
            ${this.button('envoyer')}
        </form>
        `
    }
}
module.exports = BootstrapForm;