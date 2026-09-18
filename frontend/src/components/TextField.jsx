import Field from './Field';

export default function TextField({
    label,
    value,
    onChange,
    required = false,
    disabled = false
}) {
    return <Field 
    label= {label}
    required={required}
    >
        <input 
        type="text" 
        value={value}
        required={required}
        disabled={disabled}
        onInput={(e) => onChange?.(e.target.value)} />
    </Field>
}