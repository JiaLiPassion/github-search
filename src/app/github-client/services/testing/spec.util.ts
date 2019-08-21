export function buildLinks(info: { prev?: string; next?: string; last?: string }) {
  let r = '';
  if (info) {
    const keys = Object.keys(info);
    for (let i = 0; i < keys.length; i++) {
      r += `<http://test?page=${info[keys[i]]}>; rel="${keys[i]}"`;
      if (i !== keys.length - 1) {
        r += ',';
      }
    }
  }
  return r;
}
