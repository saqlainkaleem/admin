import "./Login.css";

const FloatingLabelInput = ({ id, label, type }) => {
	return (
		<div className="floating-label">
			<input id={id} name={id} type={type} required placeholder={label} />
			<label htmlFor={id}>{label}</label>
		</div>
	);
};

const Login = ({ setIsLoggedIn }) => {
	const handleLogin = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		if (email === "admin@example.com" && password === "admin") {
			setIsLoggedIn(true);
		} else {
			alert("Invalid credentials");
		}
	};

	const handleGuestLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<div className="full-background">
			<div className="form-container">
				<img
					src="https://s3-alpha-sig.figma.com/img/d642/a9be/f90eaf6f5b6763c3412e03d14ab93c5d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mL4Fg2oVjXXmmt59lywnIune5ut6D7b4wY5cnkFnaqnwMvDxiVp9d-QRwoKfq4Syd9uRPB62qEwwuS4MyqZL6UElRbV3NoUSmrX3yQ99EqdpwwuPA4ikB3f-8fTM~BLW8XUci6gz55FjqRoYQrfwz1itNIpYuWV8YZvJjt8CJc3LFQKIWAURkZ-eeD8CKtWv~2~up~KlqH6n0Vhz0lXb58b34rOd-7cwXFAo08IrdIuxtfDEAh~uIoEHYoflea2jcZKy5C7~uZIjWup2gwA5sgbuXpz40a8w7Db0fYxWJhFIBvpZ9zZLT1mgtOW5tlitTaV1UvsMcTyVT2CWEWI~oQ__"
					width="200"
					height="80"
					className="logo-image"
					alt="TableSprint Logo"
				/>
				<p className="text-center">Welcome to TableSprint Admin</p>
				<form onSubmit={handleLogin}>
					<FloatingLabelInput id="email" label="Email" type="email" />
					<FloatingLabelInput id="password" label="Password" type="password" />
					<div className="d-flex justify-content-between mb-3">
						<a href="#" className="text-primary">
							Forgot Password?
						</a>
					</div>
					<button type="submit" className="btn btn-primary mb-2">
						Log In
					</button>
					<button
						type="button"
						className="btn btn-secondary"
						onClick={handleGuestLogin}
					>
						Login as Guest
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
