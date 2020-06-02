const recipeDeleteButton = document.getElementById('recipeDelete');

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
