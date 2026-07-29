import { useParams } from "react-router-dom"; // ✨ Import useParams
import useCustomers from "../hooks/useCustomers";
import useAuth from "../hooks/useAuth"; // Assuming you need isAuthenticated
import ReusableTabs from "../components/ReusableTabs";
import { Spinner, Alert, Button } from "react-bootstrap";

const CustomerDetailPage = () => {
  const { id } = useParams(); // ✨ Get the ID from the URL (/customers/5)
  const { isAuthenticated } = useAuth();

  // Pass isAuthenticated and the ID to the hook
  const { customer, loading, error } = useCustomers(isAuthenticated, id);

   // Content for the first tab
const PolicyContent = () => (
   <div className="p-3 bg-light rounded">
    <h3 className="text-success mb-2">Policies</h3>
    <p>
        Coming Soon: A comprehensive overview of all policies for this customer.
    </p>
  </div>
);


// Content for the second tab
const InvoiceContent = () => (
  <div className="p-3 bg-light rounded">
    <h3 className="text-success mb-2">Invoices</h3>
    <p>
        Coming Soon: A comprehensive overview of all invoices for this customer.
    </p>
  </div>
);

// Content for the third tab
const AppointmentContent = () => (
  <div className="p-3 bg-light rounded">
    <h3 className="text-warning mb-2">Appointments</h3>
    <p>
        Coming Soon: Schedule and view appointments with this customer.
    </p>
  </div>
);


// --- 2. Define the Tab Data Configuration ---

// This array is the only data needed to render the entire tab structure.
const TABS_DATA = [
  { 
    eventKey: 'policies', 
    title: 'Policies', 
    content: <PolicyContent /> // Pass the content component here
  },
  { 
    eventKey: 'invoices', 
    title: 'Invoices', 
    content: <InvoiceContent /> 
  },
  { 
    eventKey: 'appointments', 
    title: 'Appointments', 
    content: <AppointmentContent />,
  },
];


  if (loading) return <Spinner animation="border" className="m-5" />;
  
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

  if (!customer) return <p className="m-5">No customer data found.</p>;

  return (
    <div className="container mt-4">
      <Button variant="secondary" href="/customers" className="mb-3">Back to List</Button>
      <div className="card p-4 shadow-sm">
        <h2>Customer Details</h2>
        <hr />
        <p><strong>ID:</strong> {customer.id}</p>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
        {/* Add more fields as necessary */}
      </div>
      <br />
            <ReusableTabs tabs={TABS_DATA} />
    </div>
  );
};

export default CustomerDetailPage;