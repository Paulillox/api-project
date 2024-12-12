const express = require('express');
const { 
  createPokemon, 
  getAllPokemons, 
  getPokemonById,
  updatePokemon,
  deletePokemon
} = require('../controllers/pokemonController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/pokemon', authMiddleware, createPokemon);
router.get('/pokemon', authMiddleware, getAllPokemons);
router.get('/pokemon/:id', authMiddleware, getPokemonById);
router.put('/pokemon/:id', authMiddleware, updatePokemon);
router.delete('/pokemon/:id', authMiddleware, deletePokemon);

module.exports = router;