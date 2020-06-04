let { Recipe, User } = require('../models');

// mock data functions
function recipe_data() {
    console.log('<<-- Creating default recipes for database -->>');

    const recipe_one = new Recipe({
        _id: '1',
        author_id: '1',
        title: 'Best Brownies',
        author: 'Angie',
        main_ingredients: [
            '1/2 cup butter',
            '1 cup white sugar',
            '2 eggs',
            '1 teaspoon vanilla extract',
            '1/3 cup unsweetened cocoa powder',
            '1/2 cup all-purpose flour',
            '1/4 teaspoon salt',
            '1/4 teaspoon baking powder'
        ],
        sub_ingredients: [
            '3 tablespoons butter, softened',
            '3 tablespoons unsweetened cocoa powder',
            '1 tablespoon honey',
            '1 teaspoon vanilla extract',
            '1 cup confectioners\' suger'
        ],
        instructions: 'Preheat oven to 350 degrees F (175 degrees C). Grease and flour an 8-inch square pan. In a large saucepan, melt 1/2 cup butter. Remove from heat, and stir in sugar, eggs, and 1 teaspoon vanilla. Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder. Spread batter into prepared pan. Bake in preheated oven for 25 to 30 minutes. Do not overcook. To Make Frosting: Combine 3 tablespoons softened butter, 3 tablespoons cocoa, honey, 1 teaspoon vanilla extract, and 1 cup confectioners\' sugar. Stir until smooth. Frost brownies while they are still warm.',
        notes: 'Prep: 25 mins, Cook: 35 mins, Total: 1 hr, Servings: 16, Yield: 16 brownies',
        public: true
    });
    const recipe_two = new Recipe({
        _id: '2',
        author_id: '2',
        title: 'Best Chocolate Chip Cookies',
        author: 'Dora',
        main_ingredients: [
            '1 cup butter, softened',
            '1 cup white sugar',
            '1 cup packed brown sugar',
            '2 eggs',
            '2 teaspoon vanilla extract',
            '1 teaspoon baking soda',
            '2 teaspoons hot water',
            '2 cups semisweet chocolate chips',
            '3 cups all-purpose flour',
            '1/2 teaspoon salt',
            '1 cup chopped walnuts'
        ],
        instructions: 'Preheat oven to 350 degrees F (175 degrees C). Cream together the butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. Dissolve baking soda in hot water. Add to batter along with salt. Stir in flour, chocolate chips, and nuts. Drop by large spoonfuls onto ungreased pans. Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.',
        notes: 'Prep: 20 mins, Cook: 10 mins, Total: 1 hr, Servings: 24, Yield: 4 dozen',
        public: true
    });
    const recipe_three = new Recipe({
        _id: '3',
        author_id: '3',
        title: 'Puff Pastry Waffles',
        author: 'Foodelicious',
        main_ingredients: [
            '1(17.3 ounce) package frozen puff pastry, thawed',
            'cooking spray',
        ],
        instructions: "Line a cutting board with parchment paper. Unfold puff pastry onto cutting board. Cut each sheet into 4 equal squares. Preheat a waffle iron according to manufacturer's instructions. Grease with cooking spray. Place one puff pastry square in the preheated waffle iron; cook until golden brown, 3 to 5 minutes. Repeat with remaining puff pastry squares.",
        notes: 'Nonstick waffle irons may not need to be sprayed with cooking spray.',
        public: false
    });

    const save_promise_one = recipe_one.save();
    const save_promise_two = recipe_two.save();
    const save_promise_three = recipe_three.save();
    return Promise.all([save_promise_one, save_promise_two, save_promise_three])
        .then(() => console.log('Default recipes added to database'))
        .catch(() => console.log('Default recipes already exist in your database'));
}
function user_data() {
    console.log('<<-- Creating Users for database -->>');

    const user_one = new User({
        first_name: 'Angie',
        last_name: 'Smith',
        email: 'anige.smith@gmail.com',
        user_name: 'angiesmith',
        password: 'password123',
        member_status: true
    });

    const user_two = new User({
        first_name: 'Dora',
        last_name: 'Explora',
        email: 'explorintheworld@gmail.com',
        user_name: 'doraexplora',
        password: 'password123',
        member_status: true
    });

    const user_three = new User({
        first_name: 'Foodelicious',
        last_name: 'Company',
        email: 'foodelicious@gmail.com',
        user_name: 'foodelicious',
        password: 'password123',
        member_status: true
    });

    const save_promise_one = user_one.save();
    const save_promise_two = user_two.save();
    const save_promise_three = user_three.save();
    return Promise.all([save_promise_one, save_promise_two, save_promise_three])
        .then(() => console.log('Default users added to database'))
        .catch(() => console.log('Default users already exist in your database'));
}

const setupDefaultData = async () => {
    await recipe_data();
    await user_data();
};

module.exports = setupDefaultData;
