import { h as __name, p as log, ba as selectSvgElement, as as configureSvgSize, bb as package_default } from "./useSend.nLhTyqQI.js";
import { p as parse } from "./mermaid-parser.core-sqcpuNtR.CunuXegq.js";
import "vue";
import "./baseUniq-CWytw1s0.Dw9dUVOr.js";
import "./basePickBy-DBn_Ucqv.CpfvIrhC.js";
import "./clone-BKin4DIQ.Ck3Nuv6Z.js";
var parser = {
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = { version: package_default.version };
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = /* @__PURE__ */ __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
