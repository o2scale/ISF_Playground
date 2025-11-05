const MedicalCheckIn = require("../models/medicalCheckIns");

exports.createMedicalCheckIn = async (payload) => {
  return await MedicalCheckIn.create([payload])
    .then((result) => ({
      success: true,
      data: result,
      message: "Created medical check-in successfully",
    }))
    .catch((error) => {
      throw error;
    });
};

exports.getAllMedicalCheckIns = async (filters = {}, pagination = {}) => {
  const { page = 1, limit = 10 } = pagination;
  return await MedicalCheckIn.find(filters)
    .populate("student", "firstName lastName studentId balagruhaId")
    .populate("createdBy", "name email")
    .populate("followUp.assignedCoaches", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean()
    .then(async (results) => {
      const totalCount = await MedicalCheckIn.countDocuments(filters);
      return {
        success: true,
        data: results,
        count: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        message: "Fetched medical check-ins successfully",
      };
    })
    .catch((error) => {
      throw error;
    });
};

exports.getMedicalCheckInsByStudentId = async (studentId, pagination = {}) => {
  const { page = 1, limit = 10 } = pagination;
  return await MedicalCheckIn.find({ student: studentId })
    .populate("student", "firstName lastName studentId")
    .populate("createdBy", "name email")
    .populate("followUp.assignedCoaches", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean()
    .then(async (results) => {
      const totalCount = await MedicalCheckIn.countDocuments({
        student: studentId,
      });
      return {
        success: true,
        data: results,
        count: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        message: "Fetched student's medical check-ins successfully",
      };
    })
    .catch((error) => {
      throw error;
    });
};

exports.getMedicalCheckInById = async (checkInId) => {
  return await MedicalCheckIn.findById(checkInId)
    .populate("studentId", "firstName lastName studentId")
    .populate("createdBy", "name email")
    .populate("followUp.assignedCoaches", "name email")
    .lean()
    .then((result) => ({
      success: true,
      data: result,
      message: "Fetched medical check-in successfully",
    }))
    .catch((error) => {
      throw error;
    });
};

exports.updateMedicalCheckIn = async (checkInId, payload) => {
  return await MedicalCheckIn.findByIdAndUpdate(checkInId, { $set: payload }, {
    new: true,
  })
    .then((result) => ({
      success: true,
      data: result,
      message: "Updated medical check-in successfully",
    }))
    .catch((error) => {
      throw error;
    });
};

exports.deleteMedicalCheckIn = async (checkInId) => {
  return await MedicalCheckIn.findByIdAndDelete(checkInId)
    .then((result) => ({
      success: true,
      data: result,
      message: "Deleted medical check-in successfully",
    }))
    .catch((error) => {
      throw error;
    });
};

exports.updateMedicalCheckInAttachments = async (checkInId, updateData) => {
  return await MedicalCheckIn.findByIdAndUpdate(
    checkInId,
    { $set: updateData },
    { new: true }
  )
    .then((result) => ({
      success: true,
      data: result,
      message: "Updated medical check-in attachments successfully",
    }))
    .catch((error) => {
      throw error;
    });
};

exports.deleteAttachment = async (checkInId, attachmentId) => {
  return await MedicalCheckIn.findByIdAndUpdate(
    checkInId,
    { $pull: { attachments: { _id: attachmentId } } },
    { new: true }
  )
    .then((result) => ({
      success: true,
      data: result,
      message: "Deleted attachment successfully",
    }))
    .catch((error) => {
      throw error;
    });
};
