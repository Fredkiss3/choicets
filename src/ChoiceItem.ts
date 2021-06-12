export default class ChoiceItem extends HTMLElement {
    shadowRoot!: ShadowRoot;
    value: string | null;
    label: string | null;

    constructor() {
        super();
        this.attachShadow({mode: "open"});


        let template = document.createElement('template');
        template.innerHTML = `
<style>
    ::slotted(div) {
        display: flex;  
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        padding: 0 4px;
        margin: 4px 0;
    }
    
     ::slotted(div:hover) {
        background-color: #C0C0C0;
    }
</style>
<slot name="item"></slot>
`
        this.shadowRoot.appendChild(template.content);
        this.value = this.getAttribute('value');
        this.label = this.getAttribute('label');
    }

}
