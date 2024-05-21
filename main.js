import "./style.css";
import Alpine from "alpinejs";
import { spline } from "@georgedoescode/spline";
import { createNoise2D } from "simplex-noise";

Alpine.directive("uppercase", (el) => {
  el.textContent = el.textContent.toUpperCase();
});

Alpine.directive("async", (el) => {
  // console.log(el)
  let test = el.getAttributeNames();
  let sorted = [];
  let excludeList = ["x-async"];
  let storage = {};
  test.forEach((attr) => {
    console.log(attr);
    if (attr.startsWith("x-") && !attr.includes(excludeList)) {
      let slice = attr.slice(2);
      sorted.push(slice);
    }
  });
  console.log(sorted);

  sorted.forEach((component) => {
    import(`./components/${component}.js`).then((component) => {
      // Alpine.initTree(el)
      console.log('loaded a thing', component)
    })
  });


});

Alpine.directive("spline", (el) => {
  const paths = [...el.querySelectorAll("path")];
  const noise2D = createNoise2D();
  const points = [];
  let noiseStep = 0.002;

  paths.forEach(() => {
    const point = createPoints();
    points.push(point);
  });

  (function animate() {
    paths.forEach((path, index) => {
      path.setAttribute("d", spline(points[index], 1, true));

      // for every point...
      for (let i = 0; i < points[index].length; i++) {
        const point = points[index][i];

        // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
        const nX = noise(noise2D, point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise(noise2D, point.noiseOffsetY, point.noiseOffsetY);
        // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
        const x = newValue(nX, -1, 1, point.originX - 10, point.originX + 10);
        const y = newValue(nY, -1, 1, point.originY - 10, point.originY + 10);

        // update the point's current coordinates
        point.x = x;
        point.y = y;

        // progress the point's x, y values through "time"
        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
      }
    });

    requestAnimationFrame(animate);
  })();
});

function createPoints() {
  const points = [];
  // how many points do we need
  const numPoints = 6;
  // used to equally space each point around the circle
  const angleStep = (Math.PI * 2) / numPoints;
  // the radius of the circle
  const rad = 75;

  for (let i = 1; i <= numPoints; i++) {
    // x & y coordinates of the current point
    const theta = i * angleStep;

    const x = 100 + Math.cos(theta) * rad;
    const y = 100 + Math.sin(theta) * rad;

    // store the point's position
    points.push({
      x: x,
      y: y,
      // we need to keep a reference to the point's original point for when we modulate the values later
      originX: x,
      originY: y,
      // more on this in a moment!
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    });
  }

  return points;
}

function newValue(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function noise(noise, x, y) {
  return noise(x, y);
}

// AlpineJS
window.Alpine = Alpine;
Alpine.start();
