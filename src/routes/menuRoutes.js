const express = require("express");
const MenuController = require("../controllers/menuController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @typedef {object} MenuRequest
 * @property {string} name.required - Name of the menu
 * @property {number} price.required - Price of the menu
 */

/**
 * POST /api/menus
 * @summary Create a new menu
 * @tags Menus
 * @param {MenuRequest} request.body.required - Menu info
 * @return {object} 201 - Menu created successfully
 * @return {object} 500 - Server error
 */
router.post("/", authMiddleware, MenuController.createMenu);

/**
 * GET /api/menus
 * @summary Get all menus
 * @tags Menus
 * @return {object} 200 - List of menus
 * @return {object} 500 - Server error
 */
router.get("/", authMiddleware, MenuController.getMenus);

/**
 * GET /api/menus/{id}
 * @summary Get a menu by ID
 * @tags Menus
 * @param {string} id.path.required - Menu ID
 * @return {object} 200 - Menu data
 * @return {object} 404 - Menu not found
 * @return {object} 500 - Server error
 */
router.get("/:id", authMiddleware, MenuController.getMenuById);

/**
 * PUT /api/menus/{id}
 * @summary Update a menu by ID
 * @tags Menus
 * @param {string} id.path.required - Menu ID
 * @param {MenuRequest} request.body.required - Menu info
 * @return {object} 200 - Menu updated successfully
 * @return {object} 404 - Menu not found
 * @return {object} 500 - Server error
 */
router.put("/:id", authMiddleware, MenuController.updateMenuById);

/**
 * DELETE /api/menus/{id}
 * @summary Delete a menu by ID
 * @tags Menus
 * @param {string} id.path.required - Menu ID
 * @return {object} 200 - Menu deleted successfully
 * @return {object} 404 - Menu not found
 * @return {object} 500 - Server error
 */
router.delete("/:id", authMiddleware, MenuController.deleteMenuById);

module.exports = router;
