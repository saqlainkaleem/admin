import { useState } from "react";
import {
	Navbar as BootstrapNavbar,
	Container,
	Modal,
	Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

const Navbar = () => {
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const handleLogoutClick = () => {
		setShowLogoutModal(true);
	};

	const handleCloseLogoutModal = () => {
		setShowLogoutModal(false);
	};

	const handleConfirmLogout = () => {
		setShowLogoutModal(false);
	};

	return (
		<>
			<BootstrapNavbar
				bg="purple"
				variant="dark"
				fixed="top"
				className="custom-navbar"
			>
				<Container>
					<BootstrapNavbar.Brand as={Link} to="/">
						<img
							src="https://s3-alpha-sig.figma.com/img/d642/a9be/f90eaf6f5b6763c3412e03d14ab93c5d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mL4Fg2oVjXXmmt59lywnIune5ut6D7b4wY5cnkFnaqnwMvDxiVp9d-QRwoKfq4Syd9uRPB62qEwwuS4MyqZL6UElRbV3NoUSmrX3yQ99EqdpwwuPA4ikB3f-8fTM~BLW8XUci6gz55FjqRoYQrfwz1itNIpYuWV8YZvJjt8CJc3LFQKIWAURkZ-eeD8CKtWv~2~up~KlqH6n0Vhz0lXb58b34rOd-7cwXFAo08IrdIuxtfDEAh~uIoEHYoflea2jcZKy5C7~uZIjWup2gwA5sgbuXpz40a8w7Db0fYxWJhFIBvpZ9zZLT1mgtOW5tlitTaV1UvsMcTyVT2CWEWI~oQ__"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="TableSprint Logo"
						/>
					</BootstrapNavbar.Brand>
					<BootstrapNavbar.Toggle />
					<BootstrapNavbar.Collapse className="justify-content-end">
						<BootstrapNavbar.Text>
							<i
								className="bi bi-person-circle"
								onClick={handleLogoutClick}
							></i>
						</BootstrapNavbar.Text>
					</BootstrapNavbar.Collapse>
				</Container>
			</BootstrapNavbar>

			<Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
				<Modal.Header>
					<Modal.Title className="d-flex align-items-center justify-content-center">
						<i className="bi bi-exclamation-triangle-fill"></i>
						Logout
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					Are you sure you want to logout?
				</Modal.Body>
				<Modal.Footer className="justify-content-center">
					<Button
						variant="secondary"
						onClick={handleCloseLogoutModal}
						className="btn-delete"
					>
						Cancel
					</Button>
					<Button
						variant="primary"
						onClick={handleConfirmLogout}
						className="btn-confirm"
					>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Navbar;
