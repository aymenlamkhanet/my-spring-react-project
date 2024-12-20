import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeP from "./HomeP";
import Login from "./LoginP";
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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeP />} />
        <Route path="/adminprofile" element={<AdminProfilePage />} />
        <Route path="/PaymentPage" element={<PaymentsPage />} />
        <Route path="/addcar" element={<AddCarForm />} />
        <Route path="/car/:id" element={<CarDetails2 />} />
        <Route path="/paiements/:id" element={<PaymentInfoPage />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
        <Route path="/reservation/:id" element={<ReservationDetailPage />} />
        <Route path="/Reservation" element={<ReservationsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/CarsPage" element={<CarsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carpage" element={<CarPage />} />
        <Route path="/car1/:id" element={<CarDetails />} />
        <Route path="/Sales" element={<SalesPage />} />
        <Route path="/Notif" element={<NotificationsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
