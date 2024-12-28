import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContractPage = () => {
  const [contracts, setContracts] = useState([]);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch contracts from the API
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/Contract/AllContract")
      .then((response) => {
        setContracts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contracts:", error);
        setError("Failed to fetch contracts.");
        setLoading(false);
      });
  }, []);


  const handleViewPdf = (contract) => {
    if (!contract || !contract.reservation) {
      alert("Invalid contract or reservation data.");
      return;
    }

    const filename = `rental_agreement_${contract.reservation.id}.pdf`;

    axios
      .get(`http://localhost:8080/Contract/pdf/${filename}`, {
        responseType: "blob",
      })
      .then((response) => {
        // Create blob from response
        const file = new Blob([response.data], {
          type: "application/pdf",
        });

        // Create URL for the blob
        const fileURL = window.URL.createObjectURL(file);

        // Create a temporary link element
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;

        // Option 1: Open in new tab
        fileLink.target = "_blank";
        fileLink.click();

        // Option 2: Download the file
        // fileLink.download = filename;
        // fileLink.click();

        // Clean up
        window.URL.revokeObjectURL(fileURL);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
        alert("PDF not found or could not be loaded.");
      });
  };

  // Handle delete contract
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/Contract/delete/${id}`)
      .then(() => {
        setContracts(contracts.filter((contract) => contract.id !== id));
        alert("Contract deleted successfully!");
      })
      .catch(() => {
        alert("Error deleting contract.");
      });
  };

  // Handle contract info
  const handleInfo = (id) => {
    navigate(`/contracts/${id}`);
  };

  // Handle file upload
  const handleFileUpload = async (contractId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/Contract/save-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("PDF uploaded successfully!");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Sort contracts based on contract date
  const sortedContracts = [...contracts].sort((a, b) => {
    const dateA = new Date(a.contractDate);
    const dateB = new Date(b.contractDate);
    return sortOrder === "ASC" ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading contracts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 mb-6 max-w-full mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900">Contracts</h2>
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <label htmlFor="sortOrder" className="text-sm text-gray-600">
                Sort by Date
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="ASC">Newest First</option>
                <option value="DESC">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto p-4">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="px-6 py-3 text-left">Contract ID</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Details</th>
                <th className="px-6 py-3 text-left">Reservation ID</th>
                <th className="px-6 py-3 text-left">Car</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">PDF</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedContracts.length > 0 ? (
                sortedContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{contract.id}</td>
                    <td className="px-6 py-4">
                      {formatDate(contract.contractDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate">
                        {contract.contractDetails}
                      </div>
                    </td>
                    <td className="px-6 py-4">{contract.reservation?.id}</td>
                    <td className="px-6 py-4">
                      {contract.reservation?.voiture?.marque}{" "}
                      {contract.reservation?.voiture?.modele}
                    </td>
                    <td className="px-6 py-4">
                      {contract.reservation?.utilisateur?.nom}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewPdf(contract)} // Pass the whole contract object
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                          View PDF
                        </button>

                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) =>
                            handleFileUpload(contract.id, e.target.files[0])
                          }
                          className="hidden"
                          id={`pdf-upload-${contract.id}`}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleInfo(contract.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Info
                        </button>
                        <button
                          onClick={() => handleDelete(contract.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 py-4">
                    No contracts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
