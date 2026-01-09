INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions)
VALUES
    ('Pancakes', 'Fluffy, golden pancakes perfect for a hearty breakfast or brunch. Soft on the inside, slightly crispy on the outside, they pair wonderfully with syrup, fresh fruits, or a dollop of cream.', 15,
     'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
     '200g flour, 2 eggs, 250ml milk, 1 tbsp sugar, butter for frying',
     '1. In a large bowl, whisk together flour, eggs, milk, and sugar until smooth. 2. Heat a non-stick pan over medium heat and melt a small amount of butter. 3. Pour a ladle of batter onto the pan and cook until bubbles form on the surface. 4. Flip and cook the other side until golden. 5. Repeat for remaining batter. 6. Serve warm with your choice of syrup, fruits, or cream.');

INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions)
VALUES
    ('Spaghetti Bolognese', 'A classic Italian favorite with perfectly cooked spaghetti and a rich, savory meat sauce. Aromatic herbs and slowly simmered tomatoes make this dish deeply flavorful, satisfying for any meal.', 30,
     'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
     '250g spaghetti, 200g minced beef, tomato sauce, garlic, olive oil, basil, salt',
     '1. Cook spaghetti according to package instructions until al dente. 2. In a large pan, heat olive oil and sauté minced garlic until fragrant. 3. Add minced beef and cook until browned. 4. Pour in tomato sauce, add fresh basil, and simmer for 10-15 minutes until thickened. 5. Taste and season with salt and pepper. 6. Serve hot over spaghetti with a sprinkle of Parmesan cheese.');

INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions)
VALUES
    ('Greek Salad', 'A refreshing Mediterranean salad featuring juicy tomatoes, crisp cucumbers, sharp red onions, briny olives, and creamy feta cheese. Perfect as a light lunch, appetizer, or side dish.', 10,
     'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
     'Tomatoes, cucumbers, onions, feta cheese, black olives, olive oil, oregano',
     '1. Chop tomatoes, cucumbers, and onions into bite-sized pieces. 2. Add cubed feta cheese and a handful of black olives. 3. Drizzle generously with olive oil and sprinkle with dried oregano. 4. Toss gently to combine all flavors. 5. Serve immediately, optionally with warm pita bread.');

INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions)
VALUES
    ('Pumpkin Pie',
     'Traditional sweet dessert with a spiced pumpkin custard baked in a buttery crust.',
     90,
     'https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg',
     '1 pumpkin (about 500g), 200ml cream, 100g sugar, 2 eggs, 1 tsp cinnamon, 1/2 tsp nutmeg, 1 pie crust',
     '1. Preheat oven to 180°C. 2. Peel and cook the pumpkin until soft, then mash. 3. Mix pumpkin with cream, sugar, eggs, and spices. 4. Pour mixture into prepared pie crust. 5. Bake for 50-60 minutes until set. 6. Let cool and serve.');
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions)
VALUES
    ('Carbonara', '''Classic Italian pasta dish with a creamy sauce made from eggs, cheese, pancetta, and pepper.', 25,
     'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
     '200g spaghetti, 100g pancetta, 2 eggs, 50g grated Parmesan, black pepper, salt',
     '1. Boil the spaghetti until al dente. 2. Fry the pancetta until crispy. 3. Beat the eggs and mix with Parmesan. 4. Combine pasta with pancetta and remove from heat. 5. Quickly mix in the egg-cheese mixture. 6. Serve immediately with black pepper.');

INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions)
VALUES
    ('Tomato Soup', 'A warm, comforting tomato soup made from ripe tomatoes and aromatic vegetables. Smooth, flavorful, and perfect for cozy meals, especially on chilly days.', 20,
     'https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg',
     '500g tomatoes, 1 onion, 2 cloves garlic, 500ml vegetable broth, salt, pepper, olive oil',
     '1. Heat olive oil in a pot and sauté chopped onions and garlic until translucent. 2. Add chopped tomatoes and cook for 5-7 minutes. 3. Pour in vegetable broth and simmer for 10 minutes. 4. Blend the mixture until smooth using a hand blender or in batches in a regular blender. 5. Season with salt and pepper to taste. 6. Serve hot with a drizzle of cream or fresh basil for garnish.');
INSERT INTO ingredient (name, calories, protein, carbs, fat, unit) VALUES
-- Pancakes
('flour', 364, 10, 76, 1, '100g'),
('egg', 30, 3, 0.5, 2, 'piece'),
('milk', 42, 3.4, 5, 1, '100ml'),
('sugar', 387, 0, 100, 0, '100g'),
('butter', 717, 0.9, 0.1, 81, '100g'),

-- Spaghetti Bolognese
('spaghetti', 158, 5.8, 31, 0.9, '100g'),
('minced beef', 250, 26, 0, 20, '100g'),
('tomato sauce', 29, 1.4, 7, 0.2, '100g'),
('garlic', 149, 6.4, 33, 0.5, '100g'),
('olive oil', 884, 0, 0, 100, '100g'),
('basil', 23, 3, 2.7, 0.6, '10g'),
('salt', 0, 0, 0, 0, '1g'),
('pepper', 251, 10, 64, 3.3, '10g'),

-- Greek Salad
('tomato', 18, 1, 3.9, 0.2, '100g'),
('cucumber', 16, 0.7, 3.6, 0.1, '100g'),
('onion', 40, 1.1, 9, 0.1, '100g'),
('feta cheese', 264, 14, 4, 21, '100g'),
('black olives', 115, 0.8, 6, 11, '100g'),
('oregano', 306, 11, 64, 10, '10g'),

-- Pumpkin Pie
('pumpkin', 26, 1, 6.5, 0.1, '100g'),
('cream', 340, 2, 3, 36, '100ml'),
('cinnamon', 247, 4, 81, 1.2, '10g'),
('nutmeg', 525, 6, 49, 36, '10g'),
('pie crust', 400, 6, 50, 20, '1 crust'),

-- Carbonara
('pancetta', 541, 37, 1, 42, '100g'),
('grated parmesan', 431, 38, 4, 29, '100g'),

-- Tomato Soup
('vegetable broth', 5, 0.3, 1, 0, '100ml');

