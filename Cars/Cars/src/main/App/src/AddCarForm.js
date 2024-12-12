import React, { useState } from "react";
import { Upload, AlertCircle, Car, Save, X, Check } from "lucide-react";
import Sidebar from "./Sidebar";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    marque: "",
    modele: "",
    annee: "",
    type: "",
    tarifLocation: "",
    statut: "",
    kilometrage: "",
    couleur: "",
    immatriculation: "",
    imageUrl: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message, description) => {
    setToast({ type, message, description });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "marque",
      "modele",
      "annee",
      "type",
      "tarifLocation",
      "statut",
      "kilometrage",
      "couleur",
      "immatriculation",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        showToast(
          "error",
          "Formulaire Incomplet",
          `Veuillez remplir le champ ${
            field.charAt(0).toUpperCase() + field.slice(1)
          }`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      console.log("Car Data Submitted:", formData);
      showToast(
        "success",
        "Voiture Ajoutée",
        `${formData.marque} ${formData.modele} a été ajouté à votre parc.`
      );

      // Reset form after successful submission
      setFormData({
        marque: "",
        modele: "",
        annee: "",
        type: "",
        tarifLocation: "",
        statut: "",
        kilometrage: "",
        couleur: "",
        immatriculation: "",
        imageUrl: null,
      });
      setImagePreview(null);
    } catch (error) {
      showToast("error", "Erreur", "Impossible d'ajouter la voiture");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative">
        {/* Toast Notification */}
        {toast && (
          <div
            className={`
            fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg 
            ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }
          `}
          >
            <div className="flex items-center space-x-2">
              {toast.type === "success" ? (
                <Check className="mr-2" />
              ) : (
                <AlertCircle className="mr-2" />
              )}
              <div>
                <p className="font-bold">{toast.message}</p>
                <p className="text-sm">{toast.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center justify-center space-x-3">
              <Car size={32} />
              <span>Ajouter une Nouvelle Voiture</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="marque"
                    className="block mb-2 text-sm font-medium"
                  >
                    Marque
                  </label>
                  <input
                    type="text"
                    id="marque"
                    name="marque"
                    value={formData.marque}
                    onChange={handleInputChange}
                    placeholder="Ex: Toyota"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modele"
                    className="block mb-2 text-sm font-medium"
                  >
                    Modèle
                  </label>
                  <input
                    type="text"
                    id="modele"
                    name="modele"
                    value={formData.modele}
                    onChange={handleInputChange}
                    placeholder="Ex: Corolla"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Choisir un type</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Coupé">Coupé</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="statut"
                    className="block mb-2 text-sm font-medium"
                  >
                    Statut
                  </label>
                  <select
                    id="statut"
                    name="statut"
                    value={formData.statut}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Choisir un statut</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Loué">Loué</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="annee"
                    className="block mb-2 text-sm font-medium"
                  >
                    Année
                  </label>
                  <input
                    type="number"
                    id="annee"
                    name="annee"
                    value={formData.annee}
                    onChange={handleInputChange}
                    placeholder="Ex: 2023"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="kilometrage"
                    className="block mb-2 text-sm font-medium"
                  >
                    Kilométrage
                  </label>
                  <input
                    type="number"
                    id="kilometrage"
                    name="kilometrage"
                    value={formData.kilometrage}
                    onChange={handleInputChange}
                    placeholder="Ex: 5000"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tarifLocation"
                    className="block mb-2 text-sm font-medium"
                  >
                    Tarif de Location
                  </label>
                  <input
                    type="number"
                    id="tarifLocation"
                    name="tarifLocation"
                    value={formData.tarifLocation}
                    onChange={handleInputChange}
                    placeholder="Ex: 500"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="couleur"
                    className="block mb-2 text-sm font-medium"
                  >
                    Couleur
                  </label>
                  <input
                    type="text"
                    id="couleur"
                    name="couleur"
                    value={formData.couleur}
                    onChange={handleInputChange}
                    placeholder="Ex: Rouge"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mt-6 border-t pt-6 flex flex-col items-center">
              <div className="w-full max-w-md">
                <label
                  htmlFor="carImage"
                  className="block mb-2 text-sm font-medium"
                >
                  Image de la Voiture
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="carImage"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Car Preview"
                          className="h-48 w-auto object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-gray-500 mb-3" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Cliquer pour télécharger
                            </span>{" "}
                            ou glisser-déposer
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG (MAX. 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="carImage"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
              >
                <Save size={20} />
                <span>Ajouter la Voiture</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarForm;
