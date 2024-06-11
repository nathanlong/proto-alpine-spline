import "../css/style.css";
import Alpine from "alpinejs";

// do we really need this for later? maybe HMR?
let components = {};

// Data is good for modifying alpine state
Alpine.data("dataTest", () => ({
  open: false,
  init() {
    this.open = true;
  },
}));

// NOTE: if multiple it currently overwrites instance
Alpine.directive("spline", (el) => {
  import("./components/spline.js").then((Module) => {
    components["spline"] = new Module.default(el);
  });
});

Alpine.directive("repeat-text", (el) => {
  import("./components/RepeatText.js").then((Module) => {
    components["repeat"] = new Module.default(el);
  });
});

// AlpineJS
window.Alpine = Alpine;
Alpine.start();

// TODO: HMR cleanup?
console.log(components)
