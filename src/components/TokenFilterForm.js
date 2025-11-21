import { toSpanList } from '@/lib/helpers';
import React, { useEffect, } from 'react';
import { Controller, useForm } from 'react-hook-form';
import tffs from '../styles/TokenFilterForm.module.css';
export const TokenFilterForm = ({ limit = 10, setLimit, offset = 0, setOffset, gatingVisible = false, setGatingVisible, visibleList, setVisibleList, ...props }) => {
    const { register, handleSubmit, control, setValue, } = useForm();
    useEffect(() => {
        setValue('limit', limit);
        setValue('offset', offset);
        setValue('visible', visibleList.toString());
        setValue('gatingVisible', gatingVisible);
    }, [limit, offset, visibleList, gatingVisible, setValue]);
    const submit = async (data) => {
        setLimit(Number(data.limit));
        setOffset(Number(data.offset));
        setGatingVisible(data.gatingVisible);
        setVisibleList(toSpanList(data.visible));
    };
    return (React.createElement("section", null,
        React.createElement("form", { onSubmit: handleSubmit(submit), id: tffs.form, ...props },
            React.createElement("fieldset", null,
                React.createElement("legend", null, "Offset"),
                React.createElement("input", { type: "number", placeholder: "Size of the offset.", ...register('offset') })),
            React.createElement("fieldset", null,
                React.createElement("legend", null, "Limit"),
                React.createElement("input", { type: "number", placeholder: "Number of tokens to display.", ...register('limit') })),
            React.createElement("span", { className: "sep" }, "or"),
            React.createElement("fieldset", null,
                React.createElement("legend", null, "Visible\u00A0List"),
                React.createElement("input", { placeholder: "Comma, space and dash separated list of indices.", ...register('visible') })),
            React.createElement(Controller, { control, name: "gatingVisible", defaultValue: gatingVisible, render: ({ field: { onChange, value: checked, ref } }) => (React.createElement("label", { id: "perms" },
                    React.createElement("input", { type: "checkbox", checked, onChange, ref }),
                    React.createElement("span", null, "Show Permission Tokens"))) }),
            React.createElement("button", null, "View"))));
};
export default TokenFilterForm;
//# sourceMappingURL=TokenFilterForm.js.map