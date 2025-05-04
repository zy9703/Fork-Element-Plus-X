import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true
})

export const useMermaid = () => {
  const parse = (code: string)=> {
    mermaid.parse(code)
    // mermaid.render('mermaid', code, )
    return code
  }

  return parse;
}
