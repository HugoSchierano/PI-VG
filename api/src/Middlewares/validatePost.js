const validateVideogame = (req, res, next) => {
    const { name, description, platforms, } = req.body;
    if (!name ) return res.status(400).json({ error: 'Falta nombre' });
    if ( name && name.length < 4 ) return res.status(400).json({ error: 'El nombre debe tener más de 4 caracteres' });
    if (!description) return res.status(400).json({ error: 'Falta descripción' });
    if (!platforms) return res.status(400).json({ error: 'Falta plataforma' });
    next();
};

module.exports = { validateVideogame };