const { Vendor } = require('../models');

// Update a vendor
exports.updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedVendor = await Vendor.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(500).json({ message: "Error updating vendor", error: error.message });
  }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVendor = await Vendor.findByIdAndDelete(id);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vendor", error: error.message });
  }
};
