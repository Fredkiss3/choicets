# ChoiceTS

A TypeScript WebComponent alternative to choicejs, its aim is to enrich the `<select>` tag with a html options and make it searchable.

# Usage

```html

<custom-choice>
  <choice-item value="#F00" label="Red">
    <div style="display: flex; align-items: center;"> 
      <span style="height: 20px; width: 20px; background-color: red; border-radius: 9999px;"></span>
      <p>Red</p> 
    </div>
  </choice-item>
  
  <choice-item value="#0F0" label="Green">
    <div style="display: flex; align-items: center;"> 
      <span style="height: 20px; width: 20px; background-color: green; border-radius: 9999px;"></span>
      <p>Green</p> 
    </div>
  </choice-item>
  
   <choice-item value="#00F" label="Blue">
    <div style="display: flex; align-items: center;"> 
      <span style="height: 20px; width: 20px; background-color: blue; border-radius: 9999px;"></span>
      <p>Blue</p> 
    </div>
  </choice-item>
</custom-choice>

```
