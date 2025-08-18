import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../components/forms/InputField'; // Adjust path as per your project structure
import FileUpload from '../../components/forms/FileUpload'; // Adjust path as per your project structure
import SelectDropdown from '../../components/forms/SelectDropdown'; // Adjust path as per your project structure
//import './CreateApplication.css'; // Make sure this CSS file exists and has relevant styles

const CreateApplication = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameters for editing

  const [form, setForm] = useState({
    id: null, // Will store the unique ID for the application
    firstName: '',
    lastName: '',
    dob: '',
    sex: 'Male', // Default value
    maritalStatus: 'Single', // Default value
    nationality: '',
    passportNo: '',
    expiry: '',
    district: '',
    ward: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    mobile: '',
    email: '',
    photo: null, // Can be a File object or a string (URL/Base64)
  });

  const [errors, setErrors] = useState({});
  const isEditing = !!id; // True if an ID is present in the URL, indicating an edit operation

  // --- Local Storage Helper Functions ---
  const loadApplications = () => {
    const storedApplications = localStorage.getItem('creditCardApplications');
    return storedApplications ? JSON.parse(storedApplications) : [];
  };

  const saveApplications = (apps) => {
    localStorage.setItem('creditCardApplications', JSON.stringify(apps));
  };

  // --- Effect to Load Data for Editing ---
  useEffect(() => {
    if (isEditing) {
      const applications = loadApplications();
      // Find the application by ID, ensuring type consistency (convert URL id to Number)
      const applicationToEdit = applications.find(app => app.id === Number(id));

      if (applicationToEdit) {
        // Pre-fill the form state with the found application's data
        setForm(applicationToEdit);
      } else {
        // If no application is found with the given ID, alert and redirect
        alert('Application not found!');
        navigate('/applications/create');
      }
    }
  }, [id, navigate, isEditing]); // Re-run effect if ID, navigate, or isEditing status changes

  // --- Input Change Handler ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    // Clear error for the specific field when the user starts typing/changing it
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // --- File Upload Handler ---
  const handleFile = (file) => {
    setForm((prevForm) => ({ ...prevForm, photo: file }));
    // Clear the photo error if a file is selected
    if (errors.photo) {
      setErrors((prevErrors) => ({ ...prevErrors, photo: '' }));
    }
  };

  // --- Form Validation Logic ---
  const validateForm = () => {
    const newErrors = {};

    // Basic validations for all fields (you can expand on these)
    if (!form.firstName?.trim()) newErrors.firstName = 'First Name is required';
    if (!form.lastName?.trim()) newErrors.lastName = 'Last Name is required';
    if (!form.dob) newErrors.dob = 'Date of Birth is required';
    if (!form.nationality?.trim()) newErrors.nationality = 'Nationality is required';
    if (!form.passportNo?.trim()) newErrors.passportNo = 'Passport Number is required';
    if (!form.expiry) newErrors.expiry = 'Passport Expiry Date is required';
    if (!form.district?.trim()) newErrors.district = 'District is required';
    if (!form.ward?.trim()) newErrors.ward = 'Ward No. is required';
    if (!form.street?.trim()) newErrors.street = 'Street / Address Line 1 is required';
    if (!form.city?.trim()) newErrors.city = 'City is required';
    if (!form.state?.trim()) newErrors.state = 'State / Province is required';
    if (!form.zip?.trim()) newErrors.zip = 'ZIP / Postal Code is required';
    if (!form.mobile?.trim()) newErrors.mobile = 'Mobile Number is required';
    if (!form.email?.trim()) newErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email Address is invalid';

    // Photo validation: Ensure a photo is present
    if (!form.photo) {
      newErrors.photo = 'Your Photo is required';
    }

    return newErrors;
  };

  // --- Form Submission Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const applications = loadApplications();
      let updatedApplications;
      
      // Prepare the data for saving/updating
      const applicationDataToSave = {
        ...form,
        // Generate a new unique ID if it's a new application, otherwise use the existing one
        id: isEditing ? form.id : Number(Date.now() + Math.random()),
      };

      if (isEditing) {
        // Find the index of the application to update based on the ID from the URL
        const indexToUpdate = applications.findIndex(app => app.id === Number(id));
        if (indexToUpdate !== -1) {
          updatedApplications = [...applications];
          // Replace the old application object with the updated one
          updatedApplications[indexToUpdate] = applicationDataToSave;
        } else {
          // Fallback: If the ID from the URL doesn't match any in storage
          alert("Error: Application to edit not found. Creating as a new application.");
          updatedApplications = [...applications, applicationDataToSave];
        }
      } else {
        // If it's a new application, add it to the list
        updatedApplications = [...applications, applicationDataToSave];
      }

      saveApplications(updatedApplications); // Save the updated list to localStorage
      alert('Application submitted successfully!');
      navigate('/'); // Redirect to the home page after successful submission/update
    } else {
      // If there are validation errors, update the errors state to display them
      setErrors(validationErrors);
    }
  };

  // --- Cancel Handler ---
  const handleCancel = () => {
    navigate('/'); // Navigate back to the home page if the user cancels
  };

  // --- Helper function to get the correct src for the photo preview img tag ---
  const getPhotoPreviewSrc = () => {
    if (!form.photo) return ''; // Return empty if no photo data

    // If form.photo is a File object (newly selected file), create a temporary URL
    if (typeof form.photo === 'object' && form.photo instanceof File) {
      return URL.createObjectURL(form.photo);
    }
    // If form.photo is already a string (URL or Base64 from localStorage), use it directly
    if (typeof form.photo === 'string') {
      return form.photo;
    }
    // Return empty string for any other unexpected type
    return '';
  };

  return (
    <div className="application-form-page">
      <div className="page-header-banner">
        <h1 className="page-title">
          {isEditing ? 'Edit Credit Card Application' : 'Create Credit Card Application'}
        </h1>
      </div>

      <div className="form-container-outer">
        <div className="form-container-inner">
          <form onSubmit={handleSubmit} className="application-form">
            {/* Section: Photo Upload */}
            <div className="form-section card-style">
              <h2 className="section-title">Personal Photo</h2>
              <div className="photo-upload-area">
                {/* FileUpload component */}
                <FileUpload
                  label="Upload Your Photo"
                  name="photo"
                  onFile={handleFile}
                  // You might pass initial value here if your FileUpload component supports it
                  // For instance: initialValue={form.photo}
                />

                {/* Conditionally render the image preview */}
                {/* This preview will show if form.photo has any value */}
                {form.photo && (
                  <div className="photo-preview-container">
                    <img
                      src={getPhotoPreviewSrc()} // Use the helper to get the correct src
                      alt="Uploaded Photo Preview"
                      className="photo-preview-img"
                    />
                  </div>
                )}
                
                {/* Display validation error for photo if it exists */}
                {errors.photo && <p className="error-message">{errors.photo}</p>}
              </div>
            </div>

            {/* Section: Personal Details */}
            <div className="form-section card-style">
              <h2 className="section-title">Personal Information</h2>
              <div className="form-row">
                <div className="form-field">
                  <InputField
                    label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your first name" error={errors.firstName}
                  />
                </div>
                <div className="form-field">
                  <InputField
                    label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter your last name" error={errors.lastName}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <InputField
                    label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} error={errors.dob}
                  />
                </div>
                <div className="form-field">
                  <SelectDropdown
                    label="Sex" name="sex" value={form.sex} onChange={handleChange} options={['Male', 'Female', 'Other']} error={errors.sex}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <SelectDropdown
                    label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} options={['Single', 'Married', 'Divorced', 'Widowed']} error={errors.maritalStatus}
                  />
                </div>
                <div className="form-field">
                  <InputField
                    label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g., Indian, American" error={errors.nationality}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <InputField
                    label="Passport Number" name="passportNo" value={form.passportNo} onChange={handleChange} placeholder="Enter passport number" error={errors.passportNo}
                  />
                </div>
                <div className="form-field">
                  <InputField
                    label="Passport Expiry Date" name="expiry" type="date" value={form.expiry} onChange={handleChange} error={errors.expiry}
                  />
                </div>
              </div>
            </div>

            {/* Section: Residential Details */}
            <div className="form-section card-style">
              <h2 className="section-title">Residential Address</h2>
              <div className="form-row">
                <div className="form-field">
                  <InputField
                    label="District" name="district" value={form.district} onChange={handleChange} placeholder="Enter district" error={errors.district}
                  />
                </div>
                <div className="form-field">
                  <InputField
                    label="Ward No." name="ward" value={form.ward} onChange={handleChange} placeholder="Enter ward number" error={errors.ward}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <InputField
                    label="Street / Address Line 1" name="street" value={form.street} onChange={handleChange} placeholder="Enter street and house number" error={errors.street}
                  />
                </div>
                <div className="form-field">
                  <InputField
                    label="City" name="city" value={form.city} onChange={handleChange} placeholder="Enter city" error={errors.city}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <InputField
                    label="State / Province" name="state" value={form.state} onChange={handleChange} placeholder="Enter state" error={errors.state}
                  />
                </div>
                <div className="form-field">
                  <InputField
                    label="ZIP / Postal Code" name="zip" value={form.zip} onChange={handleChange} placeholder="Enter ZIP code" error={errors.zip}
                  />
                </div>
              </div>
            </div>

            {/* Section: Contact Details */}
            <div className="form-section card-style">
              <h2 className="section-title">Contact Information</h2>
              <div className="form-row">
                <div className="form-field">
                  <InputField
                    label="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Enter your mobile number" error={errors.mobile}
                  />
                </div>
                <div className="form-field">
                  <InputField
                    label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" error={errors.email}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions-container">
              <button type="submit" className="btn btn-primary-gradient btn-lg">
                {isEditing ? 'Update Application' : 'Submit Application'}
              </button>
              <button type="button" className="btn btn-secondary-light btn-lg" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateApplication;
