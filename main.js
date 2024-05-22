import "./style.css";
import Alpine from "alpinejs";

// do we really need this for later? maybe HMR?
let components = {}

Alpine.directive("load", (el, {expression}) => {
  const componentPath = `./components/${expression}.js`
  import(componentPath).then((Module) => {
    components[expression] = new Module.default(el)
  })
})

// AlpineJS
window.Alpine = Alpine;
Alpine.start();
