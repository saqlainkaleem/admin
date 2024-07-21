import { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Category from "./components/Category";
import Subcategory from "./components/Subcategory";
import Products from "./components/Products";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import EditCategory from "./components/EditCategory";
import "./App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	if (!isLoggedIn) {
		return <Login setIsLoggedIn={setIsLoggedIn} />;
	}

	return (
		<Router>
			<Navbar />
			<div className="App">
				<Sidebar />
				<div className="content">
					<Routes>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/category" element={<Category />} />
						<Route path="/edit/:id" element={<EditCategory />} />
						<Route path="/subcategory" element={<Subcategory />} />
						<Route path="/products" element={<Products />} />
						<Route path="/" element={<Navigate to="/dashboard" />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
