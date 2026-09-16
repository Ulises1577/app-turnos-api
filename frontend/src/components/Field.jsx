export default function Field({
    label, children
}) {
    return <div>
        <label> {label} </label>
        {children}
    </div>;
}