import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Container,
	Form,
	Button,
	Spinner,
	Alert,
	Row,
	Col,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EditCategory.css";

const EditCategory = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		image: "",
		status: "Active",
		sequence: "",
	});
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/categories/${id}`
				);
				setFormData(response.data);
				setImageUrl(response.data.image);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching category data: ", error);
				setError("Error fetching category data. Please try again later.");
				setLoading(false);
			}
		};

		fetchCategory();
	}, [id]);

	useEffect(() => {
		return () => {
			if (imageUrl) URL.revokeObjectURL(imageUrl);
		};
	}, [imageUrl]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleStatusChange = (status) => {
		setFormData({ ...formData, status });
	};

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			if (file.size > 10 * 1024 * 1024) {
				setError("File size exceeds 10MB.");
				return;
			}
			if (!file.type.startsWith("image/")) {
				setError("Please upload a valid image file.");
				return;
			}
			setFormData({ ...formData, image: file.name });
			setImageUrl(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name || !formData.sequence) {
			setError("Please fill in all required fields.");
			return;
		}
		try {
			await axios.put(`http://localhost:3000/categories/${id}`, formData);
			navigate("/");
		} catch (error) {
			console.error("Error updating category: ", error);
			setError("Error updating category. Please try again later.");
		}
	};

	if (loading) {
		return (
			<Container
				fluid
				className="d-flex justify-content-center align-items-center"
				style={{ height: "100vh" }}
			>
				<Spinner animation="border" />
			</Container>
		);
	}

	if (error) {
		return (
			<Container
				fluid
				className="d-flex justify-content-center align-items-center"
				style={{ height: "100vh" }}
			>
				<Alert variant="danger">{error}</Alert>
			</Container>
		);
	}

	return (
		<Container fluid className="edit-category-container">
			<h2 className="mb-4">Edit Category</h2>
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col md={6}>
						<Form.Group controlId="formCategoryName">
							<Form.Label>Category Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Category Name"
							/>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="formCategorySequence">
							<Form.Label>Category Sequence</Form.Label>
							<Form.Control
								type="number"
								name="sequence"
								value={formData.sequence}
								onChange={handleChange}
								placeholder="Category Sequence"
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<Form.Group controlId="formCategoryStatus">
							<Form.Label>Status</Form.Label>
							<DropdownButton
								title={formData.status}
								onSelect={handleStatusChange}
							>
								<Dropdown.Item eventKey="Active">Active</Dropdown.Item>
								<Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
							</DropdownButton>
						</Form.Group>
					</Col>
					<Col md={6}>
						<Form.Group controlId="formCategoryImage">
							<Form.Label>Upload Image</Form.Label>
							<div className="d-flex">
								{imageUrl && (
									<img
										src={imageUrl}
										alt="Category"
										className="img-thumbnail"
										style={{
											width: "100px",
											height: "100px",
											objectFit: "cover",
										}}
									/>
								)}
								<Form.File
									id="custom-file"
									label="Upload Maximum allowed file size is 10MB"
									custom
									onChange={handleImageChange}
								/>
							</div>
						</Form.Group>
					</Col>
				</Row>
				<div className="d-flex justify-content-end mt-4">
					<Button variant="outline-secondary" onClick={() => navigate("/")}>
						Cancel
					</Button>
					<Button variant="primary" type="submit" className="ml-2">
						Save
					</Button>
				</div>
			</Form>
		</Container>
	);
};

export default EditCategory;
