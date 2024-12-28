import React, { useState, useEffect } from "react";

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #111827, #1f2937)",
    color: "white",
    padding: "2rem",
  },
  content: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
  },
  successAlert: {
    backgroundColor: "#059669",
    color: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
  },
  card: {
    backgroundColor: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "0.5rem",
  },
  cardHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #374151",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardContent: {
    padding: "1.5rem",
  },
  profileSection: {
    gridColumn: "1 / 2",
  },
  reservationSection: {
    gridColumn: "2 / 4",
  },
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  avatar: {
    width: "8rem",
    height: "8rem",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  avatarText: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    color: "white",
  },
  editButton: {
    backgroundColor: "#2563eb",
  },
  saveButton: {
    backgroundColor: "#059669",
  },
  cancelButton: {
    backgroundColor: "#dc2626",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    color: "#9ca3af",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    backgroundColor: "#374151",
    border: "1px solid #4b5563",
    borderRadius: "0.375rem",
    color: "white",
  },
  infoItem: {
    marginBottom: "0.75rem",
  },
  infoLabel: {
    color: "#9ca3af",
  },
  infoValue: {
    fontWeight: "600",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  statCard: {
    padding: "1rem",
    borderRadius: "0.5rem",
    textAlign: "center",
  },
  statValue: {
    fontSize: "1.875rem",
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: "0.875rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem",
    borderBottom: "1px solid #374151",
  },
  td: {
    padding: "1rem 0.75rem",
    borderBottom: "1px solid #374151",
  },
  statusBadge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.875rem",
  },
};

const UserProfilePage = () => {
  const [user, setUser] = useState({
    nom: "John",
    prenom: "Doe",
    email: "john.doe@example.com",
    adresse: "123 Main St",
    numTelephone: "+1234567890",
    role: "Client",
  });

  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setReservations([
      {
        id: 1,
        dateReservation: "2024-01-01",
        dateFin: "2024-01-05",
        montantTotal: 300,
        status: "completed",
        voiture: {
          id: 1,
          marque: "BMW",
          modele: "X5",
          type: "SUV",
          tarifLocation: 100,
        },
      },
      {
        id: 2,
        dateReservation: "2024-02-01",
        dateFin: "2024-02-03",
        montantTotal: 200,
        status: "completed",
        voiture: {
          id: 2,
          marque: "Mercedes",
          modele: "C-Class",
          type: "Sedan",
          tarifLocation: 80,
        },
      },
    ]);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const stats = {
    total: reservations.length,
    completed: reservations.filter((r) => r.status === "completed").length,
    cancelled: reservations.filter((r) => r.status === "cancelled").length,
  };

  return (
    <div style={styles.container}>
      {showSuccess && (
        <div style={styles.successAlert}>Profile updated successfully!</div>
      )}

      <div style={styles.content}>
        <div style={styles.grid}>
          <div style={{ ...styles.card, ...styles.profileSection }}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Profile</h2>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.avatarSection}>
                <div style={styles.avatar}>
                  <span style={styles.avatarText}>
                    {user.prenom[0]}
                    {user.nom[0]}
                  </span>
                </div>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    style={{ ...styles.button, ...styles.editButton }}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={handleSave}
                      style={{ ...styles.button, ...styles.saveButton }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{ ...styles.button, ...styles.cancelButton }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                      style={styles.input}
                      value={editedUser.prenom}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, prenom: e.target.value })
                      }
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      style={styles.input}
                      value={editedUser.nom}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, nom: e.target.value })
                      }
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      style={styles.input}
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, email: e.target.value })
                      }
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Address</label>
                    <input
                      style={styles.input}
                      value={editedUser.adresse}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          adresse: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone</label>
                    <input
                      style={styles.input}
                      value={editedUser.numTelephone}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          numTelephone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Name:</span>
                    <p style={styles.infoValue}>
                      {user.prenom} {user.nom}
                    </p>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Email:</span>
                    <p style={styles.infoValue}>{user.email}</p>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Address:</span>
                    <p style={styles.infoValue}>{user.adresse}</p>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Phone:</span>
                    <p style={styles.infoValue}>{user.numTelephone}</p>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Role:</span>
                    <p style={styles.infoValue}>{user.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ ...styles.card, ...styles.reservationSection }}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Reservation History</h2>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.statsGrid}>
                <div style={{ ...styles.statCard, backgroundColor: "#2563eb" }}>
                  <p style={styles.statValue}>{stats.total}</p>
                  <p style={styles.statLabel}>Total Reservations</p>
                </div>
                <div style={{ ...styles.statCard, backgroundColor: "#059669" }}>
                  <p style={styles.statValue}>{stats.completed}</p>
                  <p style={styles.statLabel}>Completed</p>
                </div>
                <div style={{ ...styles.statCard, backgroundColor: "#dc2626" }}>
                  <p style={styles.statValue}>{stats.cancelled}</p>
                  <p style={styles.statLabel}>Cancelled</p>
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Car</th>
                      <th style={styles.th}>Dates</th>
                      <th style={styles.th}>Total</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td style={styles.td}>
                          <div>
                            <p style={{ fontWeight: "600" }}>
                              {reservation.voiture.marque}{" "}
                              {reservation.voiture.modele}
                            </p>
                            <p
                              style={{ fontSize: "0.875rem", color: "#9ca3af" }}
                            >
                              {reservation.voiture.type}
                            </p>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <div>
                            <p style={{ fontWeight: "600" }}>
                              {new Date(
                                reservation.dateReservation
                              ).toLocaleDateString()}
                            </p>
                            <p
                              style={{ fontSize: "0.875rem", color: "#9ca3af" }}
                            >
                              to{" "}
                              {new Date(
                                reservation.dateFin
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <p style={{ fontWeight: "600" }}>
                            ${reservation.montantTotal}
                          </p>
                        </td>
                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              backgroundColor:
                                reservation.status === "completed"
                                  ? "rgba(5, 150, 105, 0.2)"
                                  : "rgba(220, 38, 38, 0.2)",
                              color:
                                reservation.status === "completed"
                                  ? "#059669"
                                  : "#dc2626",
                            }}
                          >
                            {reservation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
