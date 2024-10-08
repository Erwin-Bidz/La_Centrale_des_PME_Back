// Un endpoint simple qui renvoie un message JSON
module.exports = (req, res) => {
    res.status(200).json({ message: 'Hello from Vercel!' });
  };