import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../../redux/actions";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import style from './Form.module.css';

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
    }, [dispatch])

    const [form, setForm] = useState({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: null,
        genres: [],
        platforms: []
    });

    const [error, setError] = useState({
        name: '',
        description: '',
        platforms: ''
    });

    const changeHandler = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        if (property === 'name') {
            validateName({ ...form, [property]: value });
            setForm({ ...form, [property]: value });
        } else if (property === 'description') {
            validateDescription({ ...form, [property]: value });
            setForm({ ...form, [property]: value });
        } else if (property === 'rating') {
            onlyOne(e);
            if (form.rating === value) { return setForm({ ...form, rating: '' }) }
            else { return setForm({ ...form, rating: value }) };
        }
        setForm({ ...form, [property]: value });
    };

    const selectHandler = (e) => {
        const value = e.target.value;
        const property = e.target.name;


        if (form[property].includes(value) === false) {
            validatePlatforms({ ...form, [property]: [...form[property], value] })
            setForm({ ...form, [property]: [...form[property], value] })
        } else {
            return alert(`No se puede repetir ${value}`);
        }
    };

    const validateName = (form) => {
        var alphanumeric = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
        form.name.length > 3 && form.name.match(alphanumeric) ?
            setError({ ...error, name: '' }) :
            setError({ ...error, name: 'El nombre debe tener m??nimo 4 caracteres alfanum??ricos' })
    };

    const validateDescription = (form) => {
        form.description.length > 0 ?
            setError({ ...error, description: '' }) :
            setError({ ...error, description: 'El videojuego debe tener una descripci??n' });
    };

    const validatePlatforms = (form) => {
        (form.platforms.length > 0) ?
            setError({ ...error, platforms: '' }) :
            setError({ ...error, platforms: 'El videojuego debe tener una plataforma' });
    };

    const submitHandler = (e) => {
        e.preventDefault()
        if (form.name.length > 3 && form.description.length > 0 && form.platforms.length > 0) {
            if (error.name.length !== 0 || error.description.length !== 0 || error.platforms.length !== 0) {
                return alert('Debe completar los campos obligatorios')
            }
            else {
                axios.post('http://localhost:3001/videogames/', form)
                    .then(res => alert(`El videogame ${form.name} fue creado con ??xito`))
                    .catch(err => alert(err));
                setForm({
                    name: '',
                    image: '',
                    description: '',
                    released: '',
                    rating: null,
                    genres: [],
                    platforms: []
                });
            }
        } else {
            return alert('Debe completar Nombre, Descripci??n y Plataforma')
        }
        history.push('/home');
    };

    const deleteGenresOption = (e, sel) => {
        e.preventDefault();
        setForm({ ...form, genres: form.genres.filter(el => el !== sel) });
    };

    const deletePlatformsOption = (e, sel) => {
        e.preventDefault();
        validatePlatforms({ ...form, platforms: form.platforms.filter(el => el !== sel) });
        setForm({ ...form, platforms: form.platforms.filter(el => el !== sel) });
    };

    const onlyOne = (e) => {
        const value = e.target.value;
        var checkboxes = document.getElementsByName('rating')
        checkboxes.forEach((item) => {
            if (item.value !== value) item.checked = false
        })
    };

    return (
        <><div>
            <h1 className={style.h1}>CREA TU VIDEOGAME</h1>
        </div>
            <form className={style.form} onSubmit={(e) => submitHandler(e)}>
                <div>

                    <div><label>Name: </label>
                        <input type='text' value={form.name} onChange={changeHandler} name='name' /><br />
                        {error.name && <span>{error.name}</span>}
                    </div>
                    <div>
                        <label>Image: </label>
                        <input type='text' value={form.image} onChange={changeHandler} name='image' />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input type='text' value={form.description} onChange={changeHandler} name='description' /><br />
                        {error.description && <span>{error.description}</span>}
                    </div>
                    <div>
                        <label>Released: </label>
                        <input type='text' value={form.released} onChange={changeHandler} name='released' />
                    </div>
                    <div>
                        <label>Rating: </label>
                        <div className={style.rtn}>
                        <input className={style.rating} type='checkbox' value='1' onChange={changeHandler} name='rating' />1<br />
                        <input className={style.rating} type='checkbox' value='2' onChange={changeHandler} name='rating' />2<br />
                        <input className={style.rating} type='checkbox' value='3' onChange={changeHandler} name='rating' />3<br />
                        <input className={style.rating} type='checkbox' value='4' onChange={changeHandler} name='rating' />4<br />
                        <input className={style.rating} type='checkbox' value='5' onChange={changeHandler} name='rating' />5<br />
                        </div>
                    </div>
                    <div>
                        <label>Genres: </label>
                        <select onChange={(e) => selectHandler(e)} name='genres'>
                            {genres?.map(gen => {
                                return (
                                    <option key={gen.id} value={gen.name}>{gen.name}</option>
                                );
                            })}
                        </select>
                        <div>
                            {form.genres?.map((sel, index) => {
                                return (
                                    <div className={style.sel} key={index}>
                                        <p>{sel}</p>
                                        <button className={style.btn} onClick={(e) => deleteGenresOption(e, sel)}>X</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <label>Platforms: </label>
                        <select onChange={(e) => selectHandler(e)} name='platforms'>
                            {platforms?.map((pl, index) => {
                                return (
                                    <option key={index} value={pl}>{pl}</option>
                                );
                            })}
                        </select><br />
                        {error.platforms && <span>{error.platforms}</span>}
                        <div>
                            {form.platforms?.map((sel, index) => {
                                return (
                                    <div className={style.sel} key={index}>
                                        <p>{sel}</p>
                                        <button className={style.btn} onClick={(e) => deletePlatformsOption(e, sel)}>X</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button className={style.button} type='submit'>CREAR VIDEOJUEGO</button>
                </div>
            </form></>
    )
};

export default Form;