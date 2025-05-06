import { s as styles_default, c as classRenderer_v3_unified_default, a as classDiagram_default, C as ClassDB } from "./chunk-A2AXSNBT-BnPxxTau.BWilWkFs.js";
import { h as __name } from "./useSend.nLhTyqQI.js";
import "./chunk-RZ5BOZE2-Bfjp9T6V.CT3eZ7Nq.js";
import "vue";
var diagram = {
  parser: classDiagram_default,
  get db() {
    return new ClassDB();
  },
  renderer: classRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
