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
let userAdminStatus = document.getElementById('spacer').getAttribute('userAdminStatus');

// Recipe Delete Button
recipeDeleteButton && recipeDeleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    const recipeId = await e.target.getAttribute('data-recipe-id');

    if(confirm('Are you sure you want to delete your Recipe?')) {
        axios.delete(`/recipe_delete/${recipeId}`)
            .then(() => {
                window.location.reload();
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
