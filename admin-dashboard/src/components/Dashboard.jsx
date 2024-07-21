import "./Dashboard.css";

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<img
				src="https://s3-alpha-sig.figma.com/img/d642/a9be/f90eaf6f5b6763c3412e03d14ab93c5d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mL4Fg2oVjXXmmt59lywnIune5ut6D7b4wY5cnkFnaqnwMvDxiVp9d-QRwoKfq4Syd9uRPB62qEwwuS4MyqZL6UElRbV3NoUSmrX3yQ99EqdpwwuPA4ikB3f-8fTM~BLW8XUci6gz55FjqRoYQrfwz1itNIpYuWV8YZvJjt8CJc3LFQKIWAURkZ-eeD8CKtWv~2~up~KlqH6n0Vhz0lXb58b34rOd-7cwXFAo08IrdIuxtfDEAh~uIoEHYoflea2jcZKy5C7~uZIjWup2gwA5sgbuXpz40a8w7Db0fYxWJhFIBvpZ9zZLT1mgtOW5tlitTaV1UvsMcTyVT2CWEWI~oQ__"
				width="300"
				height="100"
				className="logo-image"
				alt="TableSprint Logo"
			/>
			<p className="welcome-text">Welcome to TableSprint admin</p>
		</div>
	);
};

export default Dashboard;
