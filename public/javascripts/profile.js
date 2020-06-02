const recipeCreationForm = document.getElementById('recipeCreationForm');
const recipeCreationButton = document.getElementById('recipeCreationFormSubmit');
const recipeDeleteButton = document.getElementById('recipeDelete');

// Recipe Create Button
recipeCreationButton.addEventListener('click', (e) => {
    e.preventDefault();
    alert('New Recipe Created!');
    console.log("I'm adding a recipe");

    const title = recipeCreationForm.title.value;
    const author = `${window.user.last_name}, ${window.user.first_name} ${window.user.middle_name}`;
    const authorId = window.user._id;
    const mainIngredients = recipeCreationForm.mainIngredients.value.split('\n');
    const subIngredients = recipeCreationForm.subIngredients.value.split('\n');
    const instructions = recipeCreationForm.instructions.value;
    const notes = recipeCreationForm.notes.value;
    let public = recipeCreationForm.public.checked;

    const new_recipe = {
        title: title,
        author: author,
        author_id: authorId,
        main_ingredients: mainIngredients,
        sub_ingredients: subIngredients,
        instructions: instructions,
        notes: notes,
        public: public
    }

    console.log(new_recipe);

    axios.post('/recipe_create', new_recipe)
        .then(() => {
            alert('New Recipe Added.');
            window.location = `/profile?id=${window.user._id}`;
        })
        .catch((error) => {
            const errors = error.response.data.errors;
            const errorMsg = error.response.data.msg;
            let msg = '';
            if (errorMsg) {
                msg += `${errorMsg}\n`;
            }
            if (errors) {
                errors.forEach(error => msg += `${error.msg}\n`);
            }
            alert(msg);
            return false;
        })
    window.location = `/profile?id=${window.user._id}`;
});

// Recipe Delete Button
recipeDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();

    if(confirm('Are you sure you want to delete your Recipe?')) {
        axios.delete('/recipe_delete/:_id')
            .then(() => {
            })
            .catch((error) => {
                const errors = error.response.data.errors;
                const errorMsg = error.response.data.msg;
                let msg = '';
                if (errorMsg) {
                    msg += `${errorMsg}\n`;
                }
                if (errors) {
                    errors.forEach(error => msg += `${error.msg}\n`);
                }
                alert(msg);
                return false;
            });      
    }
});

// Recipe Nav Buttons

// Recipe Editor Button
document.getElementById('recipeEditorButton').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('recipeCreation').style.display = 'none';
    document.getElementById('profileRecipeSearchFeed').style.display = 'none';
    document.getElementById('editRecipeSelection').style.display = 'block';
});

// Recipe List Select Recipe
// document.getElementById('recipeEditorListTitleValue').addEventListener('click', (e) => {

// })

// Recipe No Recipes Cancel Button
// document.getElementById('recipeListCancel').addEventListener('click', (e) => {
//     e.preventDefault();

//     window.location = '/profile';
// })

// Recipe Creator Button
document.getElementById('recipeCreatorButton').addEventListener('click', (e) => {
    document.getElementById('profileRecipeSearchFeed').style.display = 'none';
    document.getElementById('recipeCreation').style.display = 'block';
    document.getElementById('editRecipeSelection').style.display = 'none';
});

document.getElementById('myRecipesButton').addEventListener('click', (e) => {
    document.getElementById('editRecipeSelection').style.display = 'none';
    document.getElementById('recipeCreation').style.display = 'none';
    document.getElementById('profileRecipeSearchFeed').style.display = 'block';
});

document.getElementById('profileLogoutButton').addEventListener('click', (e) => {
    (e).preventDefault();

    window.location = '/logout';
})