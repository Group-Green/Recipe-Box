// create hidden div for query results, onclick for display change from none.

document.getElementById('showAllRecipesButton').addEventListener('click', (e) => {
    e.preventDefault();
    // NOTE: Example of using window variable
    console.log('See here is the user and loggedIn status:', window.user, window.loggedIn);
    document.getElementById('showAllRecipes').style.display = 'block';
    document.getElementById('recipesA_E').style.display = 'none';
    document.getElementById('recipesF_J').style.display = 'none';
    document.getElementById('recipesK_O').style.display = 'none';
    document.getElementById('recipesP_T').style.display = 'none';
    document.getElementById('recipesU_Z').style.display = 'none';
})

document.getElementById('A_EButton').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('showAllRecipes').style.display = 'none';
    document.getElementById('recipesA_E').style.display = 'block';
    document.getElementById('recipesF_J').style.display = 'none';
    document.getElementById('recipesK_O').style.display = 'none';
    document.getElementById('recipesP_T').style.display = 'none';
    document.getElementById('recipesU_Z').style.display = 'none';
}); 

document.getElementById('F_JButton').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('showAllRecipes').style.display = 'none';
    document.getElementById('recipesA_E').style.display = 'none';
    document.getElementById('recipesF_J').style.display = 'block';
    document.getElementById('recipesK_O').style.display = 'none';
    document.getElementById('recipesP_T').style.display = 'none';
    document.getElementById('recipesU_Z').style.display = 'none';
});

document.getElementById('K_OButton').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('recipesA_E').style.display = 'none';
    document.getElementById('recipesF_J').style.display = 'none';
    document.getElementById('recipesK_O').style.display = 'block';
    document.getElementById('recipesP_T').style.display = 'none';
    document.getElementById('recipesU_Z').style.display = 'none';
});

document.getElementById('P_TButton').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('showAllRecipes').style.display = 'none';
    document.getElementById('recipesA_E').style.display = 'none';
    document.getElementById('recipesF_J').style.display = 'none';
    document.getElementById('recipesK_O').style.display = 'none';
    document.getElementById('recipesP_T').style.display = 'block';
    document.getElementById('recipesU_Z').style.display = 'none';
});

document.getElementById('U_ZButton').addEventListener('click', (e) => {
    e.preventDefault();

    document.getElementById('showAllRecipes').style.display = 'none';
    document.getElementById('recipesA_E').style.display = 'none';
    document.getElementById('recipesF_J').style.display = 'none';
    document.getElementById('recipesK_O').style.display = 'none';
    document.getElementById('recipesP_T').style.display = 'none';
    document.getElementById('recipesU_Z').style.display = 'block';
});
