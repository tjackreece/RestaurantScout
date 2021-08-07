const express = require("express");
const db = require("../../db/index");
const router = express.Router();
const {
	validateIdExists,
	validateDataCorrect,
} = require("./restaurant-middleware");

//Get All Restaurant
router.get("/", async (req, res, next) => {
	const restaurantRatingsData = await db.query(
		"select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
	);
	const reviews = await db.query("select * from reviews");
	try {
		res.status(200).json({
			status: "Success",
			results: restaurantRatingsData.rows.length,
			data: {
				restaurants: restaurantRatingsData.rows,
				reviews: reviews.rows,
			},
		});
	} catch (err) {
		next(err);
	}
});

//Get A Restaurant By ID
router.get("/:id", validateIdExists, async (req, res, next) => {
	const { id } = req.params;
	const restaurant = await db.query(
		"select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
		[id]
	);
	const reviews = await db.query(
		"select * from reviews where restaurant_id = $1",
		[id]
	);
	try {
		res.status(200).json({
			status: "Success",
			data: {
				restaurant: restaurant.rows[0],
				reviews: reviews.rows,
			},
		});
	} catch (err) {
		next(err);
	}
});

// Create a Restaurant
router.post("/", validateDataCorrect, async (req, res, next) => {
	const results = await db.query(
		"INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
		[req.body.name, req.body.location, req.body.price_range]
	);
	try {
		res.status(201).json({
			status: "Success",
			data: {
				newRestaurant: results.rows[0],
			},
		});
	} catch (err) {
		next(err);
	}
});

// Update Restaurants
router.put(
	"/:id",
	validateIdExists,
	validateDataCorrect,
	async (req, res, next) => {
		const { name, location, price_range } = req.body;
		const { id } = req.params;
		const results = await db.query(
			"UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
			[name, location, price_range, id]
		);
		try {
			res.status(200).json({
				status: "Success",
				data: {
					updatedRestaurant: results.rows[0],
				},
			});
		} catch (err) {
			next(err);
		}
	}
);

// Delete Restaurant
router.delete("/:id", validateIdExists, async (req, res, next) => {
	const { id } = req.params;
	const reviewDelete = db.query(
		"DELETE FROM reviews where restaurant_id = $1",
		[id]
	);
	const restaurantDelete = db.query("DELETE FROM restaurants where id = $1", [
		id,
	]);
	console.log(reviewDelete);
	console.log(restaurantDelete);
	try {
		res.status(204).send({
			status: "Success",
			message: "Restaurant Deleted",
		});
	} catch (err) {
		next(err);
	}
});

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		custom: "Actions router issue",
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;
