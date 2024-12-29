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
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    return {
      nom: storedUser.nom || "",
      prenom: storedUser.prenom || "",
      email: storedUser.email || "",
      adresse: storedUser.adresse || "",
      numTelephone: storedUser.numTelephone || "",
      role: storedUser.role || "",
      id: storedUser.id,
      password : storedUser.password,
    };
  });

  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations for the authenticated user
  useEffect(() => {
    const fetchReservations = async () => {
      if (!user.id) {
        setError("No user ID found");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/reservations/byUtilisateur/${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        let data = await response.json();

        // Set all fetched reservations to completed
        data = data.map((reservation) => ({
          ...reservation,
          status: "completed",
        }));

        // Add static reservation with "in progress" status if count >= 2
        if (data.length >= 2) {
          data.push({
            id: Date.now(),
            dateReservation: new Date().toISOString(),
            dateFin: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
            montantTotal: 450,
            status: "in progress", // Changed status to "in progress"
            voiture: {
              id: data.length + 1,
              marque: "Audi",
              modele: "Q7",
              type: "SUV",
              tarifLocation: 150,
            },
          });
        }

        setReservations(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [user.id]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      // Make API request to update user
      const response = await fetch(
        `http://localhost:8080/utilisateur/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editedUser,
            password: user.password, // Keep the existing password
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      const updatedUser = await response.json();

      // Update localStorage with new user data
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update state
      setUser(updatedUser);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      // You might want to show an error message to the user here
      console.error("Error updating user:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const stats = {
    total: reservations.length,
    completed: reservations.filter((r) => r.status === "completed").length,
    inProgress: reservations.filter((r) => r.status === "in progress").length,
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <p style={{ color: "#dc2626" }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {showSuccess && (
        <div style={styles.successAlert}>Profile updated successfully!</div>
      )}

      <div style={styles.content}>
        <div style={styles.grid}>
          <div style={{ ...styles.card, ...styles.profileSection }}>
            {/* Profile section remains the same */}
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Profile</h2>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.avatarSection}>
                <div style={styles.avatar}>
                  <span style={styles.avatarText}>
                    {user.prenom?.[0]}
                    {user.nom?.[0]}
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
                <div style={{ ...styles.statCard, backgroundColor: "#f59e0b" }}>
                  {" "}
                  {/* Changed color to amber for in-progress */}
                  <p style={styles.statValue}>{stats.inProgress}</p>
                  <p style={styles.statLabel}>In Progress</p>
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
                                  : "rgba(245, 158, 11, 0.2)",
                              color:
                                reservation.status === "completed"
                                  ? "#059669"
                                  : "#f59e0b",
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
