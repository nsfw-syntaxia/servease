"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/servicesoffered.module.css";
import { XCircle, CheckCircle } from "lucide-react"; // --- IMPORT ICONS ---

// Define a type for our service object for better type safety
interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
}

const mockServices: Service[] = [
  {
    id: 1,
    name: "Classic Manicure",
    description:
      "A timeless classic. This service includes nail shaping, cuticle care, a relaxing hand massage, and a polish of your choice. Perfect for maintaining healthy and beautiful nails.",
    price: "P500.00",
    duration: "30 min",
  },
  {
    id: 2,
    name: "Gel Pedicure",
    description:
      "Long-lasting color and shine. Includes a foot soak, nail shaping, cuticle work, callus removal, a soothing foot massage, and is finished with high-quality gel polish.",
    price: "P850.00",
    duration: "1 hrs",
  },
  {
    id: 3,
    name: "Signature Facial",
    description:
      "Rejuvenate your skin with our signature facial. This customized treatment addresses your specific skin concerns, from hydration to anti-aging. It's a truly relaxing experience.",
    price: "P1200.00",
    duration: "1 hrs",
  },
];

const ServiceRow = ({
  service,
  isGlobalEditMode,
  isCurrentlyEditing,
  onDelete,
  onStartEdit,
  onCancelEdit,
  onUpdateService,
}: {
  service: Service;
  isGlobalEditMode: boolean;
  isCurrentlyEditing: boolean;
  onDelete: (id: number) => void;
  onStartEdit: (id: number) => void;
  onCancelEdit: () => void;
  onUpdateService: (service: Service) => void;
}) => {
  // State for form data and validation errors
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    durationValue: "",
    durationUnit: "min",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When editing starts, populate the form with parsed data from the service prop
  useEffect(() => {
    if (isCurrentlyEditing) {
      // Parse price to get only the number
      const priceValue = service.price.replace(/[^0-9.]/g, "");

      // Parse duration to split value and unit
      const durationParts = service.duration.split(" ");
      const durationValue = durationParts[0] || "";
      let durationUnit = (durationParts[1] || "min").toLowerCase();
      if (!["min", "hrs"].includes(durationUnit)) {
        durationUnit = "min"; // Default to 'min' if unit is unrecognized
      }

      setFormData({
        name: service.name,
        description: service.description,
        price: priceValue,
        durationValue,
        durationUnit,
      });
      setErrors({}); // Clear previous errors
    }
  }, [isCurrentlyEditing, service]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Service name is required.";

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if ((formData.description.match(/[.!?]+/g) || []).length > 5) {
      newErrors.description = "Description cannot exceed 5 sentences.";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      newErrors.price = "Please enter a valid price (e.g., 500 or 500.00).";
    }

    if (!formData.durationValue.trim()) {
      newErrors.durationValue = "Duration is required.";
    } else if (
      !/^\d+$/.test(formData.durationValue) ||
      parseInt(formData.durationValue) <= 0
    ) {
      newErrors.durationValue = "Must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return; // Stop if validation fails
    }

    const updatedService: Service = {
      ...service,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: `P${parseFloat(formData.price).toFixed(2)}`,
      duration: `${formData.durationValue} ${formData.durationUnit}`,
    };
    onUpdateService(updatedService);
  };

  if (isCurrentlyEditing) {
    return (
      <div className={`${styles.serviceRow} ${styles.isEditingRow}`}>
        <div className={styles.tableCell}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.editableField} ${
              errors.name ? styles.errorField : ""
            }`}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>
        <div className={styles.tableCell}>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`${styles.editableField} ${styles.editableTextarea} ${
              errors.description ? styles.errorField : ""
            }`}
          />
          {errors.description && (
            <span className={styles.errorText}>{errors.description}</span>
          )}
        </div>
        <div className={styles.tableCell}>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`${styles.editableField} ${
              errors.price ? styles.errorField : ""
            }`}
            placeholder="e.g., 500.00"
          />
          {errors.price && (
            <span className={styles.errorText}>{errors.price}</span>
          )}
        </div>
        <div className={`${styles.tableCell} ${styles.durationCellContent}`}>
          <div className={styles.durationInputWrapper}>
            <input
              type="number"
              name="durationValue"
              value={formData.durationValue}
              onChange={handleInputChange}
              className={`${styles.editableField} ${
                styles.durationValueInput
              } ${errors.durationValue ? styles.errorField : ""}`}
              placeholder="30"
            />
            <select
              name="durationUnit"
              value={formData.durationUnit}
              onChange={handleInputChange}
              className={`${styles.editableField} ${styles.durationUnitSelect}`}
            >
              <option value="min">min</option>
              <option value="hrs">hrs</option>
            </select>
          </div>
          {errors.durationValue && (
            <span className={styles.errorText}>{errors.durationValue}</span>
          )}
          <div className={styles.rowActions}>
            <CheckCircle
              size={24}
              className={`${styles.actionIcon} ${styles.saveIcon}`}
              onClick={handleSave}
            />
            <XCircle
              size={24}
              className={`${styles.actionIcon} ${styles.cancelIcon}`}
              onClick={onCancelEdit}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.serviceRow}>
      <div className={styles.tableCell}>{service.name}</div>
      <div className={styles.tableCell}>{service.description}</div>
      <div className={styles.tableCell}>{service.price}</div>
      <div className={`${styles.tableCell} ${styles.durationCellContent}`}>
        <span>{service.duration}</span>
        {isGlobalEditMode && (
          <div className={styles.rowActions}>
            <Image
              width={20}
              height={20}
              alt="Edit Service"
              src="/edit_black.svg"
              className={styles.actionIcon}
              onClick={() => onStartEdit(service.id)}
            />
            <Image
              width={20}
              height={20}
              alt="Delete Service"
              src="/delete.svg"
              className={styles.actionIcon}
              onClick={() => onDelete(service.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ServicesOfferedPage: NextPage = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);

  const toggleEditMode = () => {
    // If we are turning OFF edit mode, also cancel any active row editing
    if (isEditMode) {
      setEditingServiceId(null);
    }
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleDeleteService = (idToDelete: number) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== idToDelete)
    );
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    setEditingServiceId(null); // Exit editing state for this row
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <h1 className={styles.profileTitle}>Profile</h1>

        <div className={styles.servicesHeader}>
          <div className={styles.backArrow}>
            <Image width={26} height={26} alt="Back" src="/Arrow Left.svg" />
          </div>
          <h2 className={styles.servicesTitle}>Services Offered</h2>
        </div>

        <div className={styles.servicesTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Service Name</div>
            <div className={styles.headerCell}>Description</div>
            <div className={styles.headerCell}>Price</div>
            <div className={styles.headerCell}>Duration</div>
          </div>

          <div className={styles.tableBody}>
            {services.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                isGlobalEditMode={isEditMode}
                isCurrentlyEditing={editingServiceId === service.id}
                onDelete={handleDeleteService}
                onStartEdit={setEditingServiceId}
                onCancelEdit={() => setEditingServiceId(null)}
                onUpdateService={handleUpdateService}
              />
            ))}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.btn} ${
              isEditMode ? styles.doneButton : styles.editButton
            }`}
            onClick={toggleEditMode}
          >
            <Image
              width={20}
              height={20}
              alt={isEditMode ? "Done" : "Edit"}
              src={isEditMode ? "/check_thin.svg" : "/edit.svg"}
            />
            <span>{isEditMode ? "Done" : "Edit"}</span>
          </button>
          <button className={`${styles.btn} ${styles.addButton}`}>
            <Image width={18} height={18} alt="Add" src="/plus.svg" />
            <span>Add Service</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ServicesOfferedPage;
