import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { getAllDoctors, createDoctor } from "../../api";

// Sprint6-Story-3-AC2: Searchable doctor dropdown with auto-add capability
const DoctorNameDropdown = ({ value, onChange, placeholder }) => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await getAllDoctors();
      if (response.success) {
        const options = response.data.map((doctor) => ({
          value: doctor.name,
          label: doctor.name,
        }));
        setDoctors(options);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (inputValue) => {
    try {
      setIsLoading(true);
      const response = await createDoctor(inputValue);
      if (response.success) {
        const newOption = {
          value: response.data.name,
          label: response.data.name,
        };
        setDoctors([...doctors, newOption]);
        onChange(response.data.name);
      }
    } catch (error) {
      console.error("Error creating doctor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : "");
  };

  const selectedOption = value
    ? { value: value, label: value }
    : null;

  return (
    <CreatableSelect
      isClearable
      isLoading={isLoading}
      options={doctors}
      value={selectedOption}
      onChange={handleChange}
      onCreateOption={handleCreate}
      placeholder={placeholder || "Search or add doctor name"}
      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      noOptionsMessage={() => "Type to add new doctor"}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "38px",
          borderColor: "#ddd",
        }),
        menu: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
    />
  );
};

export default DoctorNameDropdown;
