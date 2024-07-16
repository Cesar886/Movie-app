

export const Props = ({ desc, maxWords }) => {

    function recortarTexto(texto) {
        const palabras = texto.split(' ');
        // console.log("🚀 ~ recortarTexto ~ palabras:", palabras)
        if (palabras.length > maxWords) {
            return palabras.slice(0, maxWords).join(' ') + ' ...';
        }
        return texto;
    }


    return (
        <div>{recortarTexto(desc)}</div>
    );
}
