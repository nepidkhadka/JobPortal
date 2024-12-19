import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataURL from "../utils/dataURI.js";

// Register Company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name Is Required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company Is Already Added",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company Added Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Company
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Company By ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Company
export const updateCompany = async (req, res) => {
  try {
    const { name, website, description, locations } = req.body;

    const file = req.file;

    let cloudResponse = "";
    if (file) {
      const fileUri = getDataURL(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    // Updated Information
    const updatedData = {
      name,
      website,
      description,
      locations,
      logo: cloudResponse.secure_url,
    };

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Updated Sucessfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Delete Company
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
