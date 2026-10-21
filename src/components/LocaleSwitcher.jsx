import React from "react";
import styled from "styled-components";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { locales, dynamicActivate } from "../i18n/i18n";

const Label = styled.label`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const Select = styled.select`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius};
    font: inherit;
`;

const LocaleSwitcher = () => {
    const { i18n } = useLingui();
    return (
        <Label>
            <Trans>Language</Trans>
            <Select value={i18n.locale} onChange={(e) => dynamicActivate(e.target.value)}>
                {Object.entries(locales).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </Select>
        </Label>
    );
};

export default LocaleSwitcher;
