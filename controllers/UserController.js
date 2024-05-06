const User = require("../models/UserModel");

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    console.log("Piyushh")
    const { email, data } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        console.log("notuser")
        user = new User({
            email,
            likedMovies: [data] // Add the movie to the likedMovies array
          });
console.log(user)
    } else {
        console.log("user")
        const { likedMovies } = user;
        const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
        if (!movieAlreadyLiked) {
            user.likedMovies.push(data); // Update the likedMovies array
        } else return res.json({ msg: "Movie already added to the liked list." });
    }
    await user.save();
    // await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};