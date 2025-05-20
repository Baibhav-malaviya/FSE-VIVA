import React, { useState } from "react";
import styled from "styled-components";
import {
	Phone,
	Mail,
	Building,
	UserCircle,
	ChevronDown,
	ChevronUp,
} from "lucide-react";

// Styled components
const CardContainer = styled.div`
	background-color: white;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
	border: 1px solid rgba(0, 0, 0, 0.05);
	transition: all 0.3s ease;
	margin-bottom: 1.5rem;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
	}
`;

const CardHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 1.25rem;
	background: linear-gradient(120deg, #e0f7fa 0%, #e8f5e9 100%);
`;

const Avatar = styled.div`
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	background: linear-gradient(135deg, #26a69a, #66bb6a);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: bold;
	font-size: 1.25rem;
	flex-shrink: 0;
`;

const EmployeeInfo = styled.div`
	margin-left: 1rem;
	flex-grow: 1;
`;

const EmployeeName = styled.h3`
	font-size: 1.125rem;
	font-weight: 600;
	color: #2d3748;
	margin: 0;
`;

const TagContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 0.5rem;
`;

const DepartmentTag = styled.span`
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 500;
	background-color: ${(props) => props.bgColor || "#e5f6fd"};
	color: ${(props) => props.textColor || "#0369a1"};
`;

const Designation = styled.span`
	margin-left: 0.75rem;
	font-size: 0.875rem;
	color: #4a5568;
`;

const ToggleButton = styled.button`
	background: none;
	border: none;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: #4a5568;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	&:focus {
		outline: none;
	}
`;

const ContactSection = styled.div`
	padding: 0.75rem 1.25rem;
	border-top: 1px solid #f0f0f0;
`;

const InfoRow = styled.div`
	display: flex;
	align-items: center;
	color: #4a5568;
	font-size: 0.875rem;

	svg {
		color: #26a69a;
	}
`;

const InfoText = styled.span`
	margin-left: 0.625rem;
`;

const ExpandedContent = styled.div`
	padding: 1rem 1.25rem;
	background-color: #f8fafc;
	border-top: 1px solid #f0f0f0;
	display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const InfoItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.75rem;
	color: #4a5568;

	&:last-child {
		margin-bottom: 0;
	}
`;

const BiographySection = styled.div`
	margin-top: 0.75rem;
	padding-top: 0.75rem;
	border-top: 1px solid #e2e8f0;
`;

const BioText = styled.p`
	font-size: 0.875rem;
	color: #4a5568;
	line-height: 1.5;
	margin: 0;
`;

// Main component
const EnhancedEmployeeCard = ({ employee }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	// Generate a consistent color based on department name
	const getDepartmentColors = (department) => {
		const deptColors = {
			Engineering: { bg: "#e0f2fe", text: "#0369a1" },
			Marketing: { bg: "#f3e8ff", text: "#7e22ce" },
			Sales: { bg: "#dcfce7", text: "#15803d" },
			HR: { bg: "#fee2e2", text: "#b91c1c" },
			Finance: { bg: "#fef3c7", text: "#92400e" },
			Operations: { bg: "#e0e7ff", text: "#4338ca" },
			"Customer Support": { bg: "#ffedd5", text: "#c2410c" },
		};

		return deptColors[department] || { bg: "#f1f5f9", text: "#475569" };
	};

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.toUpperCase()
			.substring(0, 2);
	};

	const departmentColors = getDepartmentColors(employee.department);

	return (
		<CardContainer>
			{/* Header with avatar and basic info */}
			<CardHeader>
				<Avatar>{getInitials(employee.employeeName)}</Avatar>

				<EmployeeInfo>
					<EmployeeName>{employee.employeeName}</EmployeeName>
					<TagContainer>
						<DepartmentTag
							bgColor={departmentColors.bg}
							textColor={departmentColors.text}
						>
							{employee.department}
						</DepartmentTag>
						<Designation>{employee.designation}</Designation>
					</TagContainer>
				</EmployeeInfo>

				<ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
					{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</ToggleButton>
			</CardHeader>

			{/* Contact information */}
			<ContactSection>
				<InfoRow>
					<Phone size={16} />
					<InfoText>{employee.contactNumber}</InfoText>
				</InfoRow>
			</ContactSection>

			{/* Expanded content */}
			<ExpandedContent isVisible={isExpanded}>
				{employee.email && (
					<InfoItem>
						<Mail size={16} />
						<InfoText>{employee.email}</InfoText>
					</InfoItem>
				)}

				{employee.location && (
					<InfoItem>
						<Building size={16} />
						<InfoText>{employee.location}</InfoText>
					</InfoItem>
				)}

				{employee.manager && (
					<InfoItem>
						<UserCircle size={16} />
						<InfoText>Reports to: {employee.manager}</InfoText>
					</InfoItem>
				)}

				{employee.bio && (
					<BiographySection>
						<BioText>{employee.bio}</BioText>
					</BiographySection>
				)}
			</ExpandedContent>
		</CardContainer>
	);
};

export default EnhancedEmployeeCard;
