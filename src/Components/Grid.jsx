import { useEffect, useState } from "react";
import { getGif } from "../helpers/getGifs";
import { List } from '@mantine/core';
import { GifItem } from "./GifItem";


export const Grid = ({ category }) => {

    const [images, setImages] = useState([])

    useEffect( () => {
        getGif( category )
            .then( newImages => setImages(newImages) )
    }, [ ])
  


  return (
        <>
            <h3>{ category }</h3>

            <List> 
                {
                    images.map( ( image ) => (
                        <GifItem 
                            key={ image.id }
                            { ...image }
                        />
                    ))
                }
            </List>
        </>
    )
}
