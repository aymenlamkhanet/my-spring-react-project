import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; 
import HomeP from "./HomeP";
import Login from "./LoginP";
import ReservationForm from "./ReservationForm";
import CarPage from "./CarPage";
import CarDetails from "./CarDetails";
import AboutPage from "./AboutPage";
import AdminDashboard from "./AdminDashboard";
import ClientsPage from "./ClientsPage";
import ContactUsPage from "./ContactUsPage";
import CarsPage from "./CarsPage";
import ReservationsPage from "./ReservationsPage";
import "./App.css";
import CarDetails2 from "./CarDetails2";
import ReservationDetailPage from "./ReservationDetailPage";
import UserProfilePage from "./UserProfilePage";
import AddCarForm from "./AddCarForm";
import PaymentsPage from "./PaymentsPage";
import AdminProfilePage from "./AdminProfilePage";
import PaymentInfoPage from "./PaymentInfoPage";
import SalesPage from "./SalesPage";
import NotificationsPage from "./NotificationsPage";
import ReservationSuccess from "./ReservationSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/Reservform" element={<ReservationForm />} />
        <Route path="/reservation-success" element={<ReservationSuccess />} />
        <Route path="/carpage" element={<CarPage />} />
        <Route path="/car1/:id" element={<CarDetails />} />
        <Route path="/CarsPage" element={<CarsPage />} />

        {/* Protected Routes for Admin */}
        <Route
          path="/adminprofile"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <AdminProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PaymentPage"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <PaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcar"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <AddCarForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/car/:id"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <CarDetails2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paiements/:id"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <PaymentInfoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation/:id"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <ReservationDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Reservation"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <ReservationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Sales"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <SalesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notif"
          element={
            <ProtectedRoute requiredRole="ADMINISTRATOR">
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
