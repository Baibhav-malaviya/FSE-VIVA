import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import EmployeeCard from "../Components/EmployeeCard";

// Styled components for the AllEmployees page
const PageContainer = styled.div`
	padding: 2.5rem;
	max-width: 1100px;
	margin: 0 auto;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const HeaderSection = styled.div`
	margin-bottom: 2.5rem;
	text-align: center;
`;

const Heading = styled.h1`
	font-size: 2.5rem;
	font-weight: 600;
	margin-bottom: 0.5rem;
	color: #2d3748;
	position: relative;
	display: inline-block;

	&:after {
		content: "";
		position: absolute;
		left: 50%;
		bottom: -12px;
		transform: translateX(-50%);
		width: 80px;
		height: 4px;
		background: linear-gradient(90deg, #26a69a, #66bb6a);
		border-radius: 2px;
	}
`;

const Subheading = styled.p`
	color: #718096;
	font-size: 1.125rem;
	margin-top: 1.5rem;
`;

const CardsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
	gap: 1.5rem;
	margin-top: 2rem;
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 300px;
	font-size: 1.25rem;
	color: #718096;
`;

const Spinner = styled.div`
	width: 40px;
	height: 40px;
	margin-right: 15px;
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-left-color: #26a69a;
	border-radius: 50%;
	animation: spin 1s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

const ErrorMessage = styled.div`
	text-align: center;
	background-color: #fee2e2;
	color: #b91c1c;
	padding: 1rem;
	border-radius: 8px;
	margin: 2rem 0;
`;

const FilterSection = styled.div`
	margin: 1rem 0 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;

const SearchInput = styled.input`
	padding: 0.75rem 1rem;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	font-size: 0.875rem;
	width: 250px;
	transition: all 0.2s ease;

	&:focus {
		outline: none;
		border-color: #26a69a;
		box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.2);
	}
`;

const DepartmentFilter = styled.select`
	padding: 0.75rem 1rem;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	font-size: 0.875rem;
	background-color: white;
	cursor: pointer;
	min-width: 150px;

	&:focus {
		outline: none;
		border-color: #26a69a;
		box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.2);
	}
`;

const RefreshButton = styled.button`
	background-color: white;
	color: #26a69a;
	border: 1px solid #26a69a;
	border-radius: 8px;
	padding: 0.75rem 1.5rem;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;

	&:hover {
		background-color: #e0f2f1;
	}

	&:active {
		transform: translateY(1px);
	}
`;

const RefreshIcon = styled.span`
	display: inline-block;
	width: 16px;
	height: 16px;
	margin-right: 8px;
	border: 2px solid #26a69a;
	border-radius: 50%;
	border-top-color: transparent;
	animation: ${(props) =>
		props.isLoading ? "spin 1s linear infinite" : "none"};

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

const NoResultsMessage = styled.div`
	grid-column: 1 / -1;
	text-align: center;
	color: #718096;
	padding: 3rem 0;
	font-size: 1.125rem;
`;

const AllEmployees = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [employees, setEmployees] = useState([]);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [refreshing, setRefreshing] = useState(false);

	const fetchEmployees = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axios.get("http://localhost:5000/employees");

			if (response && response.data) {
				setEmployees(response.data);
			}
		} catch (err) {
			console.error("Failed to fetch employees:", err);
			setError("Failed to load employees. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		await fetchEmployees();
		setRefreshing(false);
	};

	useEffect(() => {
		fetchEmployees();
	}, []);

	// Get unique departments for the filter
	const departments = [
		"All Departments",
		...new Set(employees.map((emp) => emp.department)),
	];

	// Filter employees based on search term and department
	const filteredEmployees = employees.filter((emp) => {
		const matchesSearch =
			emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesDepartment =
			selectedDepartment === "" ||
			selectedDepartment === "All Departments" ||
			emp.department === selectedDepartment;

		return matchesSearch && matchesDepartment;
	});

	return (
		<PageContainer>
			<HeaderSection>
				<Heading>Our Team</Heading>
				<Subheading>
					Meet the talented individuals who make our company exceptional
				</Subheading>
			</HeaderSection>

			{error ? (
				<ErrorMessage>{error}</ErrorMessage>
			) : (
				<>
					{!isLoading && (
						<FilterSection>
							<SearchInput
								type="text"
								placeholder="Search by name or position..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>

							<DepartmentFilter
								value={selectedDepartment}
								onChange={(e) => setSelectedDepartment(e.target.value)}
							>
								<option value="">All Departments</option>
								{departments
									.filter((dept) => dept !== "All Departments")
									.map((dept) => (
										<option key={dept} value={dept}>
											{dept}
										</option>
									))}
							</DepartmentFilter>

							<RefreshButton onClick={handleRefresh} disabled={refreshing}>
								<RefreshIcon isLoading={refreshing} />
								{refreshing ? "Refreshing..." : "Refresh"}
							</RefreshButton>
						</FilterSection>
					)}

					{isLoading ? (
						<LoadingContainer>
							<Spinner />
							<span>Loading team members...</span>
						</LoadingContainer>
					) : (
						<CardsGrid>
							{filteredEmployees.length > 0 ? (
								filteredEmployees.map((emp) => (
									<EmployeeCard key={emp._id} employee={emp} />
								))
							) : (
								<NoResultsMessage>
									No employees match your search criteria. Try adjusting your
									filters.
								</NoResultsMessage>
							)}
						</CardsGrid>
					)}
				</>
			)}
		</PageContainer>
	);
};

export default AllEmployees;
