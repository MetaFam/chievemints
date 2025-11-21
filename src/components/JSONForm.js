import React, { useEffect } from 'react';
import JSON5 from 'json5';
import { HashLoader } from 'react-spinners';
import jf from '../styles/JSONForm.module.css';
export const JSONForm = ({ register, metadata, setValue }) => {
    useEffect(() => {
        if (metadata) {
            setValue('json5', JSON5.stringify(metadata, null, 2));
        }
    }, [metadata, setValue]);
    return (metadata == null ? (React.createElement("section", { id: jf.loading },
        React.createElement(HashLoader, { color: "#EB6300" }),
        React.createElement("p", null, "Fetching metadata\u2026"))) : (React.createElement("textarea", { placeholder: "Enter JSON5 token metadata\u2026", ...register('json5') })));
};
export default JSONForm;
//# sourceMappingURL=JSONForm.js.map