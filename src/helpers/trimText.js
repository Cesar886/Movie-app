export default function trimText(texto, maxWords) {
    const palabras = texto.split(' ');
    console.log("🚀 ~ trimText ~ palabras:", palabras)
    if (palabras.length > maxWords) {
        return palabras.slice(0, maxWords).join(' ') + ' ...';
    }
    return texto;
}