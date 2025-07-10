const styles = {
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  button: {
    padding: "10px 20px",
    margin: "15px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};
export const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div style={styles.pagination}>
      <button
        style={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>{currentPage}</span>
      <button
        style={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
