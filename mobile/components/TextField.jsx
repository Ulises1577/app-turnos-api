import { TextInput } from "react-native";
import Field from "./Field";

export default function TextField({
    label,
    ...props

}) {
    return <Field label={label}>
        <TextInput/>
    </Field>
}