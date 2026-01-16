package vaja1.ris.vaja1Ris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import vaja1.ris.vaja1Ris.dao.FavoriteDao;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.dao.UserDao;
import vaja1.ris.vaja1Ris.models.Favorite;
import vaja1.ris.vaja1Ris.models.Recipe;
import vaja1.ris.vaja1Ris.models.User;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/favorites")
@CrossOrigin(origins = "*")
public class FavoritesController {

    @Autowired
    private FavoriteDao favoriteDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RecipesDao recipesDao;

    @GetMapping
    public List<Long> getFavorites(@PathVariable Long userId) {
        // Provera da li user postoji
        if (!userDao.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id " + userId);
        }

        return favoriteDao.findRecipeIdsByUserId(userId);
    }

    @PostMapping("/{recipeId}")
    public void addFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        // Provera da li user postoji
        if (!userDao.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id " + userId);
        }

        // Provera da li recipe postoji
        if (!recipesDao.existsById(recipeId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found with id " + recipeId);
        }

        // Ako već postoji favorite, vrati 200 OK (idempotentno)
        if (favoriteDao.existsByUserIdAndRecipeId(userId, recipeId)) {
            return; // Already exists, return 200 OK
        }

        // Dodaj favorite
        Favorite favorite = new Favorite(userId, recipeId);
        favoriteDao.save(favorite);
    }

    @DeleteMapping("/{recipeId}")
    public void removeFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        // Provera da li user postoji
        if (!userDao.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with id " + userId);
        }

        // Provera da li recipe postoji
        if (!recipesDao.existsById(recipeId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found with id " + recipeId);
        }

        // Briše favorite (ako postoji)
        favoriteDao.deleteByUserIdAndRecipeId(userId, recipeId);
    }
}

