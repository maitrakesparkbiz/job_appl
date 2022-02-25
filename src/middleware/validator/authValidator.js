const authValidation = (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
      return res.send('username & password not be empty!');
    }
    next();
  } catch (err) {
    console.error(err);
  }
};
module.exports = { authValidation };
