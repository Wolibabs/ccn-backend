module.exports = (err, req, res) => {
console.error(err.stack);
res.status(err.status || 500).json({ message: err.message || 'Server Error' });
};