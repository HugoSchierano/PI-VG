import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../redux/actions";

const NavBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getVideogameByName(name));
        setName("");
    };


    return (
        <div className={style.navBar}>
            <Link className={style.link} to="/home">HOME</Link>
            <Link className={style.link} to="/create">FORM</Link>
            <a className={style.a}><input
                type='text'
                placeholder="Buscar por nombre"
                onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button></a>
        </div>
    )
}

export default NavBar;