const mongoose = require("mongoose");

const MONGOURI = 'mongodb://127.0.0.1:27017/team_green_recipe_blog?retryWrites=true&w=majority';

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
