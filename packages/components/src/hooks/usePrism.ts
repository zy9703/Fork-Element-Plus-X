import Prism from 'prismjs';

export const usePrism = () => {
  const highlight = (code: string, lang: string) => {
    try {
      const grammar = Prism.languages[lang];
      if (grammar) {
        return Prism.highlight(code, grammar, lang)
      }
      return code
    } catch (_error) {
      return code
    }
  }
  return highlight
}
