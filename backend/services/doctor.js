const DoctorDataAccess = require("../data-access/doctor");

// Sprint6-Story-3-AC2: Service layer for doctors

exports.getAllDoctors = async () => {
  try {
    return await DoctorDataAccess.getAllDoctors();
  } catch (error) {
    console.error("Service error - getAllDoctors:", error);
    return {
      success: false,
      data: [],
      message: error.message || "Failed to fetch doctors",
    };
  }
};

exports.createDoctor = async (doctorData) => {
  try {
    if (!doctorData.name || doctorData.name.trim() === "") {
      return {
        success: false,
        data: null,
        message: "Doctor name is required",
      };
    }

    return await DoctorDataAccess.createDoctor(doctorData);
  } catch (error) {
    console.error("Service error - createDoctor:", error);
    return {
      success: false,
      data: null,
      message: error.message || "Failed to create doctor",
    };
  }
};

exports.searchDoctors = async (searchTerm) => {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return await DoctorDataAccess.getAllDoctors();
    }
    return await DoctorDataAccess.searchDoctors(searchTerm);
  } catch (error) {
    console.error("Service error - searchDoctors:", error);
    return {
      success: false,
      data: [],
      message: error.message || "Failed to search doctors",
    };
  }
};
