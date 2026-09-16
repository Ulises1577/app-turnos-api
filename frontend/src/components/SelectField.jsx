import Field from "./Field";

export default function SelectField({
    label,
    value,
    onChange,
    options = [],
    required = false
}) { 
    return <Field
     label={label}
     >
        <select
        onChange={e => onChange?.(e.target.value)}
        value = {value}
        required={required}
        >
            <option disabled > -- Selecciona una opción -- </option>
            <option></option>
            {options.map(option => <option
                key={option.value}
                value={option.value}
                >
                    {option.label}
                </option>
            )} 
        </select>
     </Field>
}