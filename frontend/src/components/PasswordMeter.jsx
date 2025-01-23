import {Check, X} from "lucide-react";
import PropTypes from 'prop-types';

const PasswordCriteria = ({ password }) => {

    // ARRAY OF PASSWORD STRENGTHS TO CHECK FOR EACH STATE
	const criteria = [
		{ label: "At least 6 characters", met: password.length >= 6 },
		{ label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", met: /[a-z]/.test(password) },
		{ label: "Contains a number", met: /\d/.test(password) },
		{ label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
	];

     
    /*
        1. MAPPING THE CRITERIA IN AN ARRAY TO CHECK THE STRENGTH OF PASSWORD ENTERED
        2. CONDITION TO CHECK IF PASSWORD ENTERED MEETS THE CRITERIA PROVIDED IN THE ARRAY OF CRITERIA
        3. IF THE CONDITION IS MEET SHOW THE CHECK ICON ELSE SHOW X
    */
    return (
		<div className='mt-2 space-y-1'>
			{criteria.map((item) => (
				<div key={item.label} className='flex items-center text-xs'>
					{item.met ? (
						<Check className='size-4 text-green-500 mr-2' />
					) : (
						<X className='size-4 text-gray-500 mr-2' />
					)}
					<span className={item.met ? "text-green-500" : "text-gray-400"}>{item.label}</span>
				</div>
			))}
		</div>
	);
};

PasswordCriteria.propTypes = {
    password: PropTypes.string.isRequired,
  };

  //FUNCTION FOR PASSWORD METER
const PasswordMeter = ({password}) => {
    //
    const getStrength = (pass) => {
		let strength = 0;
		if (pass.length >= 6) strength++;
		if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
		if (pass.match(/\d/)) strength++;
		if (pass.match(/[^a-zA-Z\d]/)) strength++;
		return strength;
	};
    
    const strength = getStrength(password);

    //CHECK THE EACH COLOR
    const getColor = (strength) => {
		if (strength === 0) return "bg-red-500";
		if (strength === 1) return "bg-red-400";
		if (strength === 2) return "bg-yellow-500";
		if (strength === 3) return "bg-yellow-400";
		return "bg-green-500";
	};

    //CONDITION TO CHECK THE STRENGTH
	const getStrengthText = (strength) => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};

  return (
    <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Password strength </span>
            <span className="text-xs text-gray-400">{ getStrengthText(strength)}</span>
        </div>

        <div className='flex space-x-1'>
				{[...Array(4)].map((_, index) => (
					<div
						key={index}
						className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index < strength ? getColor( strength) : "bg-gray-600"}
              `}
					/>
				))}
			</div>
			<PasswordCriteria password={ password } />
      
    </div>
  )
}
PasswordMeter.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordMeter
// export default PasswordMeter
