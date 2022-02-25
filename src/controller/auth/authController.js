const getLogin = async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.log(err.message);
    return res.send('error');
  }
};

const postLogin = async (req, res) => {
  try {
    console.log('body', req.body);
    console.log('name', req.body.username);
    return res.redirect('index');
  } catch (err) {
    console.log(err.message);
    return res.send('error');
  }
};

module.exports = {
  getLogin,
  postLogin,
};
