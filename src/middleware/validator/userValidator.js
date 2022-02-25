const userValidation = (req, res, next) => {
  try {
    let authenticated = req.query.auth;
    console.log({ authenticated });
    if (authenticated !== 'true') {
      return res.send('User not authenticated!');
    }
    next();
  } catch (err) {
    console.error(err);
  }
};
module.exports = { userValidation };
