const Vendor = require('../models/vendor');

/**
 * @desc    Create new vendor
 * @route   POST /api/v2/vendors
 * @access  Admin
 */
exports.createVendor = async (req, res) => {
  try {
    const { name, phone, address, active } = req.body;

    const vendor = await Vendor.create({
      name,
      phone,
      address,
      active
    });

    res.status(201).json({
      success: true,
      vendor
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Get all vendors
 * @route   GET /api/v2/vendors
 * @access  Admin
 */
exports.getAllVendors = async (req, res) => {
  try {
    const { active, page = 1, limit = 20 } = req.query;
    const query = {};

    if (active !== undefined) {
      query.active = active === 'true';
    }

    const pageNum = parseInt(page);
    // Cap limit at 100 to prevent DoS
    const limitNum = Math.min(parseInt(limit), 100);
    const skip = (pageNum - 1) * limitNum;

    const vendors = await Vendor.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Vendor.countDocuments(query);

    res.status(200).json({
      success: true,
      count: vendors.length,
      total,
      pagination: {
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      },
      vendors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Get single vendor
 * @route   GET /api/v2/vendors/:id
 * @access  Admin
 */
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    res.status(200).json({
      success: true,
      vendor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Update vendor
 * @route   PUT /api/v2/vendors/:id
 * @access  Admin
 */
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        error: 'Vendor not found'
      });
    }

    res.status(200).json({
      success: true,
      vendor
    });
  } catch (error) {
     if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
