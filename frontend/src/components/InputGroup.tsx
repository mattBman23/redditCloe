import classNames from 'classnames';

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        required={true}
        type={type}
        autoComplete="new-input"
        className={classNames(
          'w-full px-3 py-2 transition duration-200 bg-gray-100 rounded outline-none focus:ring focus:border-blue-300 focus:bg-gray-50 hover:bg-gray-50',
          {
            'bg-red-200 focus:border-red-300 focus:bg-red-50 hover:bg-red-50': error,
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-600">{error}</small>
    </div>
  );
};

export default InputGroup;
