// Utility functions for managing favorites

export const getFavorites = (userId) => {
    if (!userId) return [];
    const stored = localStorage.getItem(`favorites_${userId}`);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch (e) {
        return [];
    }
};

export const setFavorites = (userId, favorites) => {
    if (!userId) return;
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
};

export const isFavorite = (userId, recipeId) => {
    const favorites = getFavorites(userId);
    return favorites.includes(recipeId);
};

export const toggleFavorite = async (userId, recipeId, isCurrentlyFavorite) => {
    if (!userId) return false;
    
    const favorites = getFavorites(userId);
    let newFavorites;
    
    if (isCurrentlyFavorite) {
        // Remove from favorites
        newFavorites = favorites.filter(id => id !== recipeId);
        setFavorites(userId, newFavorites);
        
        // Call backend DELETE
        try {
            await fetch(`http://localhost:8083/users/${userId}/favorites/${recipeId}`, {
                method: 'DELETE'
            });
            return false;
        } catch (error) {
            // Rollback on failure
            setFavorites(userId, favorites);
            console.error("Error removing favorite:", error);
            throw error;
        }
    } else {
        // Add to favorites
        newFavorites = [...favorites, recipeId];
        setFavorites(userId, newFavorites);
        
        // Call backend POST
        try {
            await fetch(`http://localhost:8083/users/${userId}/favorites/${recipeId}`, {
                method: 'POST'
            });
            return true;
        } catch (error) {
            // Rollback on failure
            setFavorites(userId, favorites);
            console.error("Error adding favorite:", error);
            throw error;
        }
    }
};

