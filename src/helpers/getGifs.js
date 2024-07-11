

export const getGif = async( category )=> {

    const url = `https://api.themoviedb.org/3/search/movie?api_key=abf7d734dcd7cce557ecf0abc3a863bf&query=${ category }`
    const resp = await fetch ( url );
    const { results } = await resp.json();
    // const urlFinal = `https://image.tmdb.org/t/p/w500${}`
    console.log("🚀 ~ getGif ~ results:", results)

    const movies = results.map( img => ({ 
        id: img.id,
        title: img.title,
        url: `https://image.tmdb.org/t/p/w500${ img.poster_path }`,
        desc: img.overview,
        rate: img.vote_average,
    }));
    // console.log("🚀 ~ movies ~ movies:", movies)
    return movies;

      
}