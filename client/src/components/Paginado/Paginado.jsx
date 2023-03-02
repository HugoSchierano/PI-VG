import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({ videogamesPerPage, videogames, paginado }) {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(videogames / videogamesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav className={style.pagination}>
            <ul>
                {pageNumbers?.map(num => (
                    <li key={num}>
                        <button onClick={() => paginado(num)}>{num}</button>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}