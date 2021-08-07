const db = require("../../db");

async function validateIdExists(req, res, next) {
	const { id } = req.params;
	const IdValid = await db.query("select * from restaurants where id = $1", [
		id,
	]);
	if (IdValid.rowCount === 0) {
		res.status(404).json({
			message: `restaurant id ${id} does not exist`,
		});
	} else {
		next();
	}
}
async function validateDataCorrect(req, res, next) {
	const { name, location, price_range } = req.body;
	if (name.length < 5) {
		res.status(404).json({
			message: `Change the name ${name}, not enough characters`,
		});
	} else if (location.length < 4) {
		res.status(404).json({
			message: `Change the location name ${location}, not enough characters`,
		});
	} else if (price_range > 5) {
		res.status(404).json({
			message: `your price range ${price_range}, is too high choose numbers 0 - 5`,
		});
	} else {
		next();
	}
}
module.exports = { validateIdExists, validateDataCorrect };
