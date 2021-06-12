import ChoiceItem from "./ChoiceItem";

export default class Choice extends HTMLElement {
  shadowRoot!: ShadowRoot;
  options!: HTMLDivElement;
  box!: HTMLInputElement;
  selected?: ChoiceItem;
  choices: ChoiceItem[];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let template = document.createElement("template");
    template.innerHTML = `
<style>

    .box {
        border: 1px solid #C0C0C0;
        cursor: pointer;
        width: 100%;
        height: 30px;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        padding: 0 4px;
        align-items: center;
    }
    
    :host(:focus-visible), :host(:focus) {
        outline: none;
    }
    
    :host(:focus-visible) > .box, :host(:focus) > .box {
        border-color: #A0A0A0;
        box-shadow: 0 0 0 0.18rem rgba(192,192,192,0.7);
        outline: none;
    }

    .options {
        display: none;
        margin-top: .25rem;
        padding: .5rem 0;
        border-radius: 5px;
        border: 1px solid #C0C0C0;
        box-shadow: 1px 1px 5px #C0C0C05C;
        z-index: 100;
    }
    
    .options.show {
        display: block;
    }
     
    .options > ::slotted(div) {
        cursor: pointer;
        padding: 2px 0;
    }
    
    .options > ::slotted(div:hover) {
        background-color: #C0C0C0;
    }
</style>
<input class="box" type="search" />


<div class="options">
</div>
`;
    this.shadowRoot.appendChild(template.content);

    this.options = this.shadowRoot.querySelector(".options") as HTMLDivElement;
    this.box = this.shadowRoot.querySelector(".box") as HTMLInputElement;

    this.choices = Array.from(
      this.querySelectorAll("choice-item")
    ) as ChoiceItem[];
    this.renderItems(this.choices);
  }

  renderItems(items: ChoiceItem[] = []) {
    this.options.innerHTML = ``;
    let i = Number.parseInt(this.getAttribute('tabindex') ?? '0') + 1 ;
    for (const item of items) {
      item.setAttribute("tabindex", `${i++}`);
      this.options.appendChild(item);
    }
  }

  showOptions() {
    this.renderItems(this.choices);
    this.options.classList.add("show");
  }

  hideOptions() {
    this.options.classList.remove("show");
  }

  selectOption(el: ChoiceItem) {
    this.selected = el;
    this.hideOptions();

    this.box.value = `${el.label}`;
  }

  get value(): string | null | undefined {
    return this.selected?.value;
  }

  get label(): string | null | undefined {
    return this.selected?.label;
  }

  searchForChildren(q: string): Array<ChoiceItem> {
    if (!this.options.classList.contains('show')) {
      this.showOptions();
    }
    let found = this.choices.filter((choice) =>
      choice.innerText.toLowerCase().trim().startsWith(q.toLowerCase())
    );

    this.renderItems(found);

    return found;
  }

  connectedCallback() {
    this.addEventListener("blur", () => {
      this.selected ? this.selectOption(this.selected) : (this.box.value = "");
      this.hideOptions();
    });
    this.box.addEventListener("focus", () => this.showOptions());
    // @ts-ignore
    this.box.addEventListener("input", () =>
      this.searchForChildren(this.box.value)
    );

    this.box.addEventListener("change", () => {
      let found = this.searchForChildren(this.box.value);

      found.length > 0 && this.selectOption(found[0]);
    });

    this.choices.forEach((el) =>
      el.addEventListener("click", () => this.selectOption(el))
    );
  }

  disconnectedCallback() {}
}
