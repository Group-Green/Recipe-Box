// Collapsible Recipes
let coll = document.getElementsByClassName('collapsible');
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
}

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
