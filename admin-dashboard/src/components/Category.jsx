import { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import {
	Button,
	Container,
	Table,
	InputGroup,
	FormControl,
	Spinner,
	Alert,
	Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Category.css";

const Category = () => {
	const [searchInput, setSearchInput] = useState("");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteCategoryId, setDeleteCategoryId] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/categories");
				setData(response.data.categories || []);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
				setError("Error fetching data. Please try again later.");
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: () => (
					<div>
						Id &nbsp;
						<i className="bi bi-arrow-down-up"></i>
					</div>
				),
				accessor: "id",
			},
			{
				Header: () => (
					<div>
						Category name &nbsp;
						<i className="bi bi-arrow-down-up"></i>
					</div>
				),
				accessor: "name",
			},
			{
				Header: () => (
					<div>
						Image &nbsp;
						<i className="bi bi-arrow-down-up"></i>
					</div>
				),
				accessor: "image",
				Cell: ({ cell: { value } }) => (
					<img src={value} alt="Category" width="50" />
				),
			},
			{
				Header: () => (
					<div>
						Status &nbsp;
						<i className="bi bi-arrow-down-up"></i>
					</div>
				),
				accessor: "status",
				Cell: ({ cell: { value } }) => (
					<span style={{ color: value === "Active" ? "green" : "red" }}>
						{value}
					</span>
				),
			},
			{
				Header: () => (
					<div>
						Sequence &nbsp;
						<i className="bi bi-arrow-down-up"></i>
					</div>
				),
				accessor: "sequence",
			},
			{
				Header: "Action",
				Cell: ({ row }) => (
					<div>
						<Button
							variant="link"
							className="p-0"
							onClick={() => navigate(`/edit/${row.original.id}`)}
							style={{ marginRight: "15px" }}
						>
							<i className="bi bi-pencil"></i>
						</Button>
						<Button
							variant="link"
							className="p-0"
							onClick={() => handleDeleteClick(row.original.id)}
						>
							<i className="bi bi-trash"></i>
						</Button>
					</div>
				),
			},
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
	} = useTable({ columns, data }, useGlobalFilter);

	const handleSearch = (e) => {
		const value = e.target.value || "";
		setGlobalFilter(value);
		setSearchInput(value);
	};

	const handleDeleteClick = (id) => {
		setDeleteCategoryId(id);
		setShowDeleteModal(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			await axios.delete(
				`http://localhost:3000/categories/${deleteCategoryId}`
			); // Replace with your API endpoint
			setData(data.filter((item) => item.id !== deleteCategoryId));
			setShowDeleteModal(false);
		} catch (error) {
			console.error("Error deleting category: ", error);
			setError("Error deleting category. Please try again later.");
			setShowDeleteModal(false);
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
		<Container fluid className="category-container">
			<div className="header d-flex align-items-center justify-content-space-between">
				<div className="d-flex align-items-center">
					<i className="bi bi-grid category-icon"></i>
					<h2 className="title mb-0">Category</h2>
					<InputGroup className="search-bar">
						<FormControl
							placeholder="🔍"
							value={searchInput}
							onChange={handleSearch}
						/>
					</InputGroup>
				</div>
				<Button variant="primary" className="add-category-btn">
					Add Category
				</Button>
			</div>

			<Table
				{...getTableProps()}
				striped
				bordered
				hover
				className="category-table"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</Table>

			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
				centered
			>
				<Modal.Header className="border-bottom-0">
					<Modal.Title className="">
						<i className="bi bi-exclamation-triangle-fill"></i>
						Delete
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					Are you sure you want to delete?
				</Modal.Body>
				<Modal.Footer className="border-top-0 justify-content-center">
					<Button
						variant="outline-secondary"
						className="btn-delete"
						onClick={() => setShowDeleteModal(false)}
					>
						Cancel
					</Button>
					<Button
						variant="primary"
						className="btn-confirm"
						onClick={handleDeleteConfirm}
					>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Category;
