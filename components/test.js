import Alpine from "alpinejs";

export default function test() {
  Alpine.directive("test", (el) => {
    console.log("test directive", el);
  });
}

console.log('test loaded?')
