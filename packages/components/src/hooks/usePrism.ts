import Prism from 'prismjs';

// type PrismTheme = 'coy' | 'dark' | 'funky' | 'okaidia' | 'solarizedlight' | 'tomorrow' | 'twilight';

// interface UsePrismProps {
//   theme: PrismTheme;
// }

export const usePrism = () => {
  // switch (theme) {
  //   case 'coy':
  //     import('./prism-coy.min.css');
  //     break;
  //   case 'funky':
  //     import('./prism-funky.min.css');
  //     break;
  //   case 'okaidia':
  //     import('./prism-okaidia.min.css');
  //     break;
  //   case 'solarizedlight':
  //     import('./prism-solarizedlight.min.css');
  //     break;
  //   case 'tomorrow':
  //     import('./prism-tomorrow.min.css');
  //     break;
  //   case 'twilight':
  //     import('./prism-twilight.min.css');
  //     break;
  //   case 'dark':
  //     import('./prism-dark.min.css');
  //     break;
  //   default:
  //     import('./prism.min.css')
  //     break;
  // }
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
