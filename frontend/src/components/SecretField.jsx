import Field from './Field';

export default function SecretField({
    label,
    value,
    onChange
}) {
    return <Field label= {label}>
        <input 
        type="password" 
        value={value}
        onInput={(e) => onChange?.(e.target.value)} />
    </Field>
}