const Menu = require("../models/menu");

class MenuController {
  async createMenu(req, res) {
    const { name, price } = req.body;
    const userId = req.user.id;

    try {
      const newMenu = new Menu({
        name,
        price,
        userId,
      });
      await newMenu.save();
      res
        .status(201)
        .json({ message: "Menu created successfully", data: newMenu });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res
          .status(400)
          .json({ message: "Validation error", error: messages });
      } else {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  }

  async getMenus(req, res) {
    const userId = req.user.id;
    try {
      const menus = await Menu.find({ userId });
      res.status(200).json({ data: menus });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res
          .status(400)
          .json({ message: "Validation error", error: messages });
      } else {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  }

  async getMenuById(req, res) {
    const { id } = req.params;
    try {
      const menu = await Menu.findById(id);
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      res.status(200).json({ data: menu });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res
          .status(400)
          .json({ message: "Validation error", error: messages });
      } else {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  }

  async updateMenuById(req, res) {
    const { id } = req.params;
    const { name, price } = req.body;

    try {
      const updatedMenu = await Menu.findByIdAndUpdate(
        id,
        { name, price },
        { new: true }
      );
      if (!updatedMenu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      res
        .status(200)
        .json({ message: "Menu updated successfully", data: updatedMenu });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res
          .status(400)
          .json({ message: "Validation error", error: messages });
      } else {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  }

  async deleteMenuById(req, res) {
    const { id } = req.params;
    try {
      const deletedMenu = await Menu.findByIdAndDelete(id);
      if (!deletedMenu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

module.exports = new MenuController();
