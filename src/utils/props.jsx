const prueba = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur tempus purus sit amet dolor facilisis, eu malesuada eros consectetur. Nulla ut sem eget purus sodales convallis in vitae diam. Suspendisse pharetra efficitur orci eget scelerisque. In molestie mattis felis eget tempor. Morbi ut gravida justo. Etiam neque purus, dapibus a fringilla sit amet, luctus ut neque. Sed tempus enim non rutrum rhoncus. Quisque ut nisl tristique, luctus sapien eu, rhoncus urna. Nullam urna tortor, vulputate rutrum porta vel, tincidunt vitae tellus. Mauris sit amet justo facilisis, convallis lacus et, lobortis odio. Morbi dignissim ipsum felis, eu mattis erat auctor quis. Quisque sodales ipsum ac turpis consequat scelerisque. Fusce bibendum orci non orci porttitor euismod. Vivamus varius urna id dui congue feugiat. Mauris ut efficitur diam. Integer a dolor sed dolor scelerisque feugiat.";

export const Props = () => {

    function recortarTexto(texto) {
        const palabras = texto.split(' ');
        console.log("🚀 ~ recortarTexto ~ palabras:", palabras)
        if (palabras.length > 5) {
            return palabras.slice(0, 8).join(' ') + ' ...';
        }
        return texto;
    }


    return (
        <div>{recortarTexto(prueba)}</div>
    );
}
