import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
    return (
        <div className={style.landing}>
            <h1 className={style.h1}>Bienvenidos a Videogames</h1>
            {/* <h2 className={style.h2}>En nuestra App encontrarás toda la info sobre Videogames</h2> */}
            <Link to ='/home'>
                <button>GO!!</button>
            </Link>
        </div>
    )
};

export default Landing;