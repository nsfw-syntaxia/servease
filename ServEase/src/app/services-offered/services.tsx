"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../styles/servicesoffered.module.css";
import { XCircle, CheckCircle } from "lucide-react";

import {
  type Service,
  getServices,
  addService,
  updateService,
  deleteService,
} from "./actions";

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
  onUpdateService: (service: Service) => Promise<void>; // make async
}) => {
  const rowClassNames = [
    styles.serviceRow,
    isGlobalEditMode ? styles.editModeRow : "",
    isCurrentlyEditing ? styles.isEditingRow : "",
  ].join(" ");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isCurrentlyEditing) {
      const priceValue = service.price
        ? service.price.replace(/[^0-9.]/g, "")
        : "";
      setFormData({
        name: service.name,
        description: service.description,
        price: priceValue,
      });
      setErrors({});
    }
  }, [isCurrentlyEditing, service]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Service name is required.";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.length > 50) {
      newErrors.description = "Description cannot exceed 50 characters.";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      newErrors.price = "Please enter a valid price.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate() || isSaving) {
      return;
    }
    setIsSaving(true);
    const updatedService: Service = {
      ...service,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: `Php${parseFloat(formData.price).toFixed(2)}`,
    };
    // now async and handles the api call
    await onUpdateService(updatedService);
    setIsSaving(false);
  };

  if (isCurrentlyEditing) {
    return (
      <div className={rowClassNames}>
        <div className={styles.tableCell}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.editableField} ${
              errors.name ? styles.errorField : ""
            }`}
            placeholder="Service Name"
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
            maxLength={50}
            className={`${styles.editableField} ${styles.editableTextarea} ${
              errors.description ? styles.errorField : ""
            }`}
            placeholder="Maximum of 50 characters."
          />
          <span
            className={errors.description ? styles.errorText : styles.charCount}
          >
            {errors.description ??
              `${formData.description.length}/50 characters`}
          </span>
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
        <div className={`${styles.tableCell} ${styles.actionsCell}`}>
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
    <div className={rowClassNames}>
      <div className={styles.tableCell}>{service.name}</div>
      <div className={styles.tableCell}>{service.description}</div>
      <div className={styles.tableCell}>{service.price}</div>

      <div className={`${styles.tableCell} ${styles.actionsCell}`}>
        {isGlobalEditMode && (
          <div className={styles.rowActions}>
            <Image
              width={18}
              height={18}
              alt="Edit Service"
              src="/edit_black.svg"
              className={styles.actionIcon}
              onClick={() => onStartEdit(service.id)}
            />
            <Image
              width={24}
              height={24}
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

type ServicesOfferedClient = {
  initialData: Service[];
};

const ServicesOffered: NextPage<ServicesOfferedClient> = ({ initialData }) => {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [saveTrigger, setSaveTrigger] = useState(0);

  useEffect(() => {
    const loadServices = async () => {
      const { data, error } = await getServices();
      if (error) {
        alert("Failed to load services: " + error);
      } else if (data) {
        setServices(data);
      }
      setIsLoading(false);
    };
    loadServices();
  }, []);

  const cleanupUnsavedService = () => {
    if (editingServiceId === null) return;
    const serviceToCancel = services.find((s) => s.id === editingServiceId);

    if (
      serviceToCancel &&
      serviceToCancel.name === "" &&
      serviceToCancel.price === ""
    ) {
      setServices((prev) => prev.filter((s) => s.id !== editingServiceId));
    }
  };

  const toggleEditMode = () => {
    cleanupUnsavedService();
    setEditingServiceId(null);
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleDeleteService = async (idToDelete: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const { error } = await deleteService(idToDelete);

    if (error) {
      alert("Failed to delete service: " + error);
    } else {
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== idToDelete)
      );
    }
  };

  const handleUpdateService = async (updatedService: Service) => {
    const originalService = services.find((s) => s.id === updatedService.id);
    const isNewService = originalService?.name === "";

    const payload = {
      name: updatedService.name,
      description: updatedService.description,
      price: parseFloat(updatedService.price.replace(/[^0-9.]/g, "")),
    };

    if (isNewService) {
      // add new service
      const { data: newServiceFromDB, error } = await addService(payload);
      if (error) {
        alert("Failed to add service: " + error);
        setServices((prev) => prev.filter((s) => s.id !== updatedService.id));
      } else if (newServiceFromDB) {
        setServices((prev) =>
          prev.map((s) => (s.id === updatedService.id ? newServiceFromDB : s))
        );
        setIsEditMode(false);
      }
    } else {
      // update existing service
      const { error } = await updateService(updatedService.id, payload);
      if (error) {
        alert("Failed to update service: " + error);
      } else {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === updatedService.id ? updatedService : service
          )
        );
      }
    }

    setEditingServiceId(null);
  };

  const handleAddService = () => {
    if (editingServiceId !== null) return;

    const newService: Service = {
      id: Math.random(),
      name: "",
      description: "",
      price: "",
    };

    setServices((prev) => [...prev, newService]);
    setEditingServiceId(newService.id);
    setIsEditMode(true); // enter edit mode automatically
  };

  const handleCancelEdit = () => {
    cleanupUnsavedService();
    setEditingServiceId(null);

    const serviceToCancel = services.find((s) => s.id === editingServiceId);
    if (serviceToCancel && serviceToCancel.name === "") {
      setIsEditMode(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <h1 className={styles.profileTitle}>Profile</h1>

        <div className={styles.servicesHeader}>
          <div
            className={styles.backArrow}
            onClick={() => router.push("/facility-profile")}
          >
            <Image width={26} height={26} alt="Back" src="/Arrow Left.svg" />
          </div>
          <h2 className={styles.servicesTitle}>Services Offered</h2>
        </div>

        <div className={styles.servicesTable}>
          {services.length > 0 && (
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Service Name</div>
              <div className={styles.headerCell}>Description</div>
              <div className={styles.headerCell}>Price</div>
              <div className={styles.headerCell}></div>
            </div>
          )}

          <div className={styles.tableBody}>
            {[...services]
              .sort((a, b) => {
                // push any service with an empty name to the bottom of the list
                if (a.name === "") return 1;
                if (b.name === "") return -1;

                // for all other services, sort alphabetically by name
                return a.name.localeCompare(b.name);
              })
              .map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  isGlobalEditMode={isEditMode}
                  isCurrentlyEditing={editingServiceId === service.id}
                  onDelete={handleDeleteService}
                  onStartEdit={setEditingServiceId}
                  onCancelEdit={handleCancelEdit}
                  onUpdateService={handleUpdateService}
                />
              ))}
          </div>
        </div>

        <div className={styles.actionButtons}>
          {services.some(
            (service) => service.name !== "" && service.price !== ""
          ) && (
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
          )}
          <button
            className={`${styles.btn} ${styles.addButton}`}
            onClick={handleAddService}
          >
            <Image width={18} height={18} alt="Add" src="/plus.svg" />
            <span>Add Service</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ServicesOffered;
