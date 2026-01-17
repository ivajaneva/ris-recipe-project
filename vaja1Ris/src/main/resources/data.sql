-- Pancakes (no label)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions,category, label)
VALUES
    ('Pancakes', 'Fluffy, golden pancakes perfect for a hearty breakfast or brunch. Soft on the inside, slightly crispy on the outside, they pair wonderfully with syrup, fresh fruits, or a dollop of cream.', 15,
     'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
     '200g flour, 2 eggs, 250ml milk, 1 tbsp sugar, butter for frying',
     '1. In a large bowl, whisk together flour, eggs, milk, and sugar until smooth. 2. Heat a non-stick pan over medium heat and melt a small amount of butter. 3. Pour a ladle of batter onto the pan and cook until bubbles form on the surface. 4. Flip and cook the other side until golden. 5. Repeat for remaining batter. 6. Serve warm with your choice of syrup, fruits, or cream.',
     'Sweets',null);

-- Spaghetti Bolognese (no label)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions,category, label)
VALUES
    ('Spaghetti Bolognese', 'A classic Italian favorite with perfectly cooked spaghetti and a rich, savory meat sauce. Aromatic herbs and slowly simmered tomatoes make this dish deeply flavorful, satisfying for any meal.', 30,
     'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg',
     '250g spaghetti, 200g minced beef, tomato sauce, garlic, olive oil, basil, salt',
     '1. Cook spaghetti according to package instructions until al dente. 2. In a large pan, heat olive oil and sauté minced garlic until fragrant. 3. Add minced beef and cook until browned. 4. Pour in tomato sauce, add fresh basil, and simmer for 10-15 minutes until thickened. 5. Taste and season with salt and pepper. 6. Serve hot over spaghetti with a sprinkle of Parmesan cheese.',
     'Pasta',null);

-- Greek Salad (VEGETARIAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category,label)
VALUES
    ('Greek Salad', 'A refreshing Mediterranean salad featuring juicy tomatoes, crisp cucumbers, sharp red onions, briny olives, and creamy feta cheese. Perfect as a light lunch, appetizer, or side dish.', 10,
     'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
     'Tomatoes, cucumbers, onions, feta cheese, black olives, olive oil, oregano',
     '1. Chop tomatoes, cucumbers, and onions into bite-sized pieces. 2. Add cubed feta cheese and a handful of black olives. 3. Drizzle generously with olive oil and sprinkle with dried oregano. 4. Toss gently to combine all flavors. 5. Serve immediately, optionally with warm pita bread.',
     'Salads','VEGETARIAN');

-- Pumpkin Pie (no label)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions,category, label)
VALUES
    ('Pumpkin Pie', 'Traditional sweet dessert with a spiced pumpkin custard baked in a buttery crust.', 90,
     'https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg',
     '1 pumpkin (about 500g), 200ml cream, 100g sugar, 2 eggs, 1 tsp cinnamon, 1/2 tsp nutmeg, 1 pie crust',
     '1. Preheat oven to 180°C. 2. Peel and cook the pumpkin until soft, then mash. 3. Mix pumpkin with cream, sugar, eggs, and spices. 4. Pour mixture into prepared pie crust. 5. Bake for 50-60 minutes until set. 6. Let cool and serve.',
     'Sweets',null);

-- Carbonara (no label)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions,category, label)
VALUES
    ('Carbonara', 'Classic Italian pasta dish with a creamy sauce made from eggs, cheese, pancetta, and pepper.', 25,
     'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
     '200g spaghetti, 100g pancetta, 2 eggs, 50g grated Parmesan, black pepper, salt',
     '1. Boil the spaghetti until al dente. 2. Fry the pancetta until crispy. 3. Beat the eggs and mix with Parmesan. 4. Combine pasta with pancetta and remove from heat. 5. Quickly mix in the egg-cheese mixture. 6. Serve immediately with black pepper.',
     'Pasta',null);

-- Tomato Soup (VEGAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions,category, label)
VALUES
    ('Tomato Soup', 'A warm, comforting tomato soup made from ripe tomatoes and aromatic vegetables. Smooth, flavorful, and perfect for cozy meals, especially on chilly days.', 20,
     'https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg',
     '500g tomatoes, 1 onion, 2 cloves garlic, 500ml vegetable broth, salt, pepper, olive oil',
     '1. Heat olive oil in a pot and sauté chopped onions and garlic until translucent. 2. Add chopped tomatoes and cook for 5-7 minutes. 3. Pour in vegetable broth and simmer for 10 minutes. 4. Blend the mixture until smooth using a hand blender or in batches in a regular blender. 5. Season with salt and pepper to taste. 6. Serve hot with a drizzle of cream or fresh basil for garnish.',
     'Soup','VEGAN');

-- Chickpea Salad (VEGAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Chickpea Salad', 'Fresh vegan salad with chickpeas, vegetables and lemon-olive oil dressing. Light and nutritious.', 12,
     'https://cdn.loveandlemons.com/wp-content/uploads/2023/05/chickpea-salad-1.jpg',
     '200g chickpeas, 1 cucumber, 2 tomatoes, 1/2 onion, 1 tbsp olive oil, 1 tbsp lemon juice, salt, pepper',
     '1. Chop vegetables. 2. Mix chickpeas and vegetables in a bowl. 3. Add olive oil, lemon juice, salt and pepper. 4. Toss and serve.',
     'Salads',
     'VEGAN');

-- Lentil Soup (VEGAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Lentil Soup', 'Simple vegan lentil soup with carrots and onions. Great as a light meal.', 35,
     'https://cdn.loveandlemons.com/wp-content/uploads/2023/12/lentil-soup-recipe.jpg',
     '200g lentils, 1 onion, 2 carrots, 2 cloves garlic, 700ml vegetable broth, salt, pepper',
     '1. Saute onion and garlic. 2. Add carrots and lentils. 3. Pour broth and simmer 25-30 min. 4. Season and serve.',
     'Soup',
     'VEGAN');

-- Veggie Omelette (VEGETARIAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Veggie Omelette', 'Vegetarian omelette with vegetables and cheese. Quick breakfast.', 10,
     'https://www.allrecipes.com/thmb/bZ0Ts-a3TLKdpts-NeIVH9OMCCI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5941200-yummy-veggie-omelet-AllrecipesPhot-4x3o-9731d76434de4b7daae40281f56a7a66.jpg',
     '2 eggs, 50g cheese, 1 tomato, 1/2 onion, salt, pepper',
     '1. Beat eggs with salt and pepper. 2. Add chopped vegetables. 3. Cook in pan, add cheese, fold and serve.',
     'Breakfast',
     'VEGETARIAN');

-- Vegan Buddha Bowl (VEGAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Vegan Buddha Bowl', 'Colorful vegan bowl with quinoa, roasted vegetables and tahini dressing.', 25,
     'https://cdn.loveandlemons.com/wp-content/uploads/2020/06/IMG_25462.jpg',
     '100g quinoa, 1 sweet potato, 1 zucchini, 1 bell pepper, olive oil, salt, pepper, tahini',
     '1. Cook quinoa according to instructions. 2. Roast chopped vegetables with olive oil. 3. Arrange everything in a bowl and drizzle with tahini.',
     'Healthy',
     'VEGAN');

-- Vegan Tomato Pasta (VEGAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Vegan Tomato Pasta', 'Simple vegan pasta with tomato sauce, garlic and basil.', 20,
     'https://www.thefieryvegetarian.com/wp-content/uploads/2021/09/vegan-creamy-tomato-pasta-681x1024.jpg',
     '200g pasta, tomato sauce, 2 cloves garlic, olive oil, basil, salt',
     '1. Cook pasta. 2. Saute garlic in olive oil. 3. Add tomato sauce and simmer. 4. Mix with pasta and basil.',
     'Pasta',
     'VEGAN');

-- Caprese Salad (VEGETARIAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Caprese Salad', 'Classic Italian vegetarian salad with tomatoes, mozzarella and basil.', 10,
     'https://cdn.loveandlemons.com/wp-content/uploads/2019/08/caprese-salad-recipe.jpg',
     'tomatoes, mozzarella, fresh basil, olive oil, salt',
     '1. Slice tomatoes and mozzarella. 2. Arrange on plate with basil. 3. Drizzle with olive oil and season.',
     'Salads',
     'VEGETARIAN');

-- Mushroom Risotto (VEGETARIAN)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Mushroom Risotto', 'Creamy vegetarian risotto with mushrooms and Parmesan.', 35,
     'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto-recipe.jpg',
     'rice, mushrooms, onion, vegetable broth, butter, parmesan',
     '1. Saute onion and mushrooms. 2. Add rice and gradually add broth. 3. Stir until creamy. 4. Add butter and parmesan.',
     'Dinner',
     'VEGETARIAN');

-- Chocolate Mug Cake (no label)
INSERT INTO recipe (name, description, duration, image_url, ingredients, instructions, category, label)
VALUES
    ('Chocolate Mug Cake', 'Quick sweet dessert made in a mug. Soft and chocolatey.', 7,
     'https://www.cookingclassy.com/wp-content/uploads/2020/02/chocolate-mug-cake-33.jpg',
     '4 tbsp flour, 2 tbsp sugar, 2 tbsp cocoa, 1 egg, 3 tbsp milk, 2 tbsp oil',
     '1. Mix dry ingredients in a mug. 2. Add egg, milk and oil. 3. Mix well. 4. Microwave 1-2 minutes and serve.',
     'Sweets',
     NULL);


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

-- Pumpkin PieA
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

INSERT INTO ingredient (name, calories, protein, carbs, fat, unit) VALUES
('chickpeas', 164, 8.9, 27.4, 2.6, '100g'),
('tomatoes', 18, 1.0, 3.9, 0.2, '100g'),
('lemon juice', 22, 0.3, 6.9, 0.2, '100ml'),
('lentils', 116, 9.0, 20.0, 0.4, '100g'),
('carrots', 41, 0.9, 10.0, 0.2, '100g'),
('cheese', 350, 25.0, 2.0, 28.0, '100g'),
('quinoa', 120, 4.4, 21.3, 1.9, '100g'),
('sweet potato', 86, 1.6, 20.1, 0.1, '100g'),
('zucchini', 17, 1.2, 3.1, 0.3, '100g'),
('bell pepper', 31, 1.0, 6.0, 0.3, '100g'),
('tahini', 595, 17.0, 21.0, 53.0, '100g'),
('pasta', 158, 5.8, 31.0, 0.9, '100g'),
('mozzarella', 280, 28.0, 3.0, 17.0, '100g'),
('fresh basil', 23, 3.0, 2.7, 0.6, '10g'),
('rice', 130, 2.7, 28.0, 0.3, '100g'),
('mushrooms', 22, 3.1, 3.3, 0.3, '100g'),
('parmesan', 431, 38.0, 4.0, 29.0, '100g'),
('cocoa', 228, 19.6, 57.9, 13.7, '100g'),
('oil', 884, 0.0, 0.0, 100.0, '100g');

INSERT INTO users (username, password) VALUES
('nadja', '1234'),
('iva', '1234'),
('veljko', '1234');


