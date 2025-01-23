
import PropTypes from 'prop-types';

const FormInput = ({ icon: Icon, ...props }) => {
  return (
    <>
        <div className="relative mb-6">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <Icon className="size-5 text-orange-600"/>
            </div>

            <input
				{...props}
        autoComplete="on"
				className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 transition duration-200'
			/>
        </div>

    </>
  )
}
FormInput.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

export default FormInput;