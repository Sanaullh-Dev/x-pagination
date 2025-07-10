import { useEffect, useState } from "react";
import "./App.css";
import { PaginationComponent } from "./components/pagination";

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

function App() {
  const pageSize = 10; // Example page size
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  console.log("🚀 ~ App ~ currentData:", currentData);
  const [totalPages, setTotalPages] = useState(0); // Assuming
  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page on new fetch
    setTotalPages(0); // Reset total pages on new fetch
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        alert("failed to fetch data");
        setEmployees([]); // Clear employees on error
        setTotalPages(0); // Reset total pages on error
        setCurrentPage(1); // Reset to first page on error
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      setTotalPages(Math.ceil(employees.length / pageSize));
      const pageNo = currentPage === 0 ? 0 : (currentPage - 1) * pageSize;
      setCurrentData(employees.slice(pageNo, currentPage * pageSize));
    }
  }, [employees, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>Employee Data Table</h1>
      {currentData?.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((employee) => (
                <tr key={employee.id}>
                  <td style={styles.td}>{employee.id}</td>
                  <td style={styles.td}>{employee.name}</td>
                  <td style={styles.td}>{employee.email}</td>
                  <td style={styles.td}>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      ) : (
        <div>No employee data available.</div>
      )}
    </div>
  );
}

export default App;
