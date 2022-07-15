const notFound = (req,res) => res.status(404).send('The Route Does Not Exists');

module.exports = notFound ;