import React, { useEffect, useState } from 'react';
import './Loading.css';

export const Loading = () => {

    const [dots, setDots] = useState(".")

    useEffect(() => {
        const doting = setInterval(() => {
            switch (dots) {
                case ".":
                    setDots("..")
                    break;
                case "..":
                    setDots("...")
                    break;
                case "...":
                    setDots(".")
                    break;


                default:
                    break;
            }
        }, 200);

        return () => {
            clearInterval(doting);
        }
    }, [dots])

    return (
        <div className="loading_bg">
            <h1>Loading{dots}</h1>
        </div>
    )
}