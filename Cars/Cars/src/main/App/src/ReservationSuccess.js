import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import axios from "axios";
import logo from "./Logo2.png";
import signature from "./signature.png";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "white",
    fontSize: 11,
    lineHeight: 1.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 50,
  },
  blueBanner: {
    width: 200,
    height: 30,
    backgroundColor: "#000080",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  reference: {
    fontSize: 11,
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 15,
    textAlign: "justify",
  },
  signatureImage: {
    width: 150, // Adjust the size as needed
    height: 50,
    marginVertical: 5,
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
  },
  signatureLine: {
    marginTop: 5,
    marginBottom: 10,
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    fontSize: 10,
  },
});

// PDF Component
const RentalAgreementPDF = ({ reservation, user, currentDate }) => {
  const reference = Math.random().toString(36).substr(2, 9).toUpperCase();
  const representativeName = "Aymen Lamkhanet";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={logo} />
          <View style={styles.blueBanner} />
        </View>

        <Text style={styles.title}>
          RENTAL AGREEMENT AND RESERVATION CONFIRMATION
        </Text>

        <Text style={styles.reference}>Reference Number: {reference}</Text>
        <Text style={styles.reference}>Date: {currentDate}</Text>

        {/* Main Agreement Text as One Cohesive Paragraph */}
        <Text style={styles.paragraph}>
          This Rental Agreement ("Agreement") is entered into between CarRental
          Company, located at 123 Anywhere St., Any City ("the Company"), and{" "}
          {user.nom} {user.prenom} ("the Renter"), residing at {user.adresse}.
          By this agreement, the Company agrees to rent to the Renter a{" "}
          {reservation.carDetails?.marque} {reservation.carDetails?.modele},
          Year {reservation.carDetails?.annee}, for the period from{" "}
          {new Date(reservation.dateReservation).toLocaleDateString()} to{" "}
          {new Date(reservation.dateFin).toLocaleDateString()}, at a daily rate
          of {reservation.carDetails?.tarifLocation} DHS, with a total rental
          amount of {reservation.totalAmount} DHS. The rental includes
          comprehensive insurance with standard coverage, subject to a
          deductible payable by the Renter in case of damage. The Renter agrees
          to maintain the vehicle in the same condition as received, comply with
          all traffic laws, and return the vehicle with the same fuel level. Any
          violations, damages, or excessive cleaning requirements will result in
          additional charges as per the Company's current rates. This agreement
          is subject to early termination by the Company in case of violation of
          its terms, with all rental fees remaining due and payable. The Renter
          acknowledges receipt of the vehicle in good condition and agrees to
          report any damage or mechanical issues immediately to the Company.
        </Text>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text>Renter:</Text>
            <Text style={styles.signatureLine}>_________________________</Text>
            <Text>
              {user.nom} {user.prenom}
            </Text>
            <Text>Date: {currentDate}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text>Company Representative:</Text>
            <Text style={styles.signatureLine}>_________________________</Text>
            <Text>{representativeName}</Text>
            <Text>Date: {currentDate}</Text>
            <Image style={styles.signatureImage} src={signature} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text>CarRental Company • 123 Anywhere St., Any City</Text>
          <Text>Tel: +123-456-7890 • Email: contact@carrentalcompany.com</Text>
        </View>
      </Page>
    </Document>
  );
};

const generateContract = async (reservation, user, currentDate) => {
  try {
    // Generate PDF blob
    const pdfBlob = await pdf(
      <RentalAgreementPDF
        reservation={reservation}
        user={user}
        currentDate={currentDate}
      />
    ).toBlob();

    const formData = new FormData();
    const fileName = `rental_agreement_${
      reservation.id
    }.pdf`;
    formData.append(
      "file",
      new File([pdfBlob], fileName, { type: "application/pdf" })
    );

    // Save to server
    await axios.post("http://localhost:8080/Contract/save-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Also trigger download in browser
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error generating contract:", error);
    return false;
  }
};

// Main Component
const ReservationSuccess = () => {
  const reservation = JSON.parse(localStorage.getItem("lastReservation")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const currentDate = new Date().toLocaleDateString();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const success = await generateContract(reservation, user, currentDate);
      if (!success) {
        alert("Error generating contract. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      {/* Left Side - Agreement Preview */}
      <div className="w-1/2 pr-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <img
                src={logo}
                alt="Company Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="h-8 w-32 bg-blue-900"></div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold">TO</h2>
            <p>
              {user.nom} {user.prenom}
            </p>
            <p>{user.adresse}</p>
            <div className="mt-2">
              <p>Date: {currentDate}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h1 className="text-2xl font-bold mb-6">RENTAL AGREEMENT</h1>
            <div className="space-y-4">
              <p>This agreement confirms the rental of:</p>
              <p className="font-semibold">
                {reservation.carDetails?.marque}{" "}
                {reservation.carDetails?.modele} (
                {reservation.carDetails?.annee})
              </p>
              <p>
                For the period of{" "}
                {new Date(reservation.dateReservation).toLocaleDateString()} to{" "}
                {new Date(reservation.dateFin).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full disabled:bg-blue-400"
    >
      {isGenerating ? "Generating..." : "Download Full Agreement"}
    </button>
        </div>
      </div>

      {/* Right Side - Confirmation Card */}
      <div className="w-1/2 pl-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-green-500 text-5xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Amazing! Your Booking is Confirmed
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for choosing our service, {user.prenom}!
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-gray-600">Vehicle</p>
                <p className="font-bold">
                  {reservation.carDetails?.marque}{" "}
                  {reservation.carDetails?.modele}
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Duration</p>
                <p className="font-bold">
                  {new Date(reservation.dateReservation).toLocaleDateString()} -{" "}
                  {new Date(reservation.dateFin).toLocaleDateString()}
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Daily Rate</p>
                <p className="font-bold">
                  {reservation.carDetails?.tarifLocation} DHS
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-600">Total Amount</p>
                <p className="font-bold text-xl text-blue-600">
                  {reservation.totalAmount} DHS
                </p>
              </div>
            </div>
          </div>

          <div className="text-gray-600">
            <p className="mb-4">
              Your rental documents have been sent to {user.email}
            </p>
            <p className="text-sm">Booking Reference: #</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccess;
