import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { get } from "../state/apiService";
import LocaleSwitcher from "../components/LocaleSwitcher";
import { Page, Toolbar, StyledLink } from "../styles/Layout";

/*
 * Expected details API response body:
 * {
 *   success: true,
 *   message: "Product fetched successfully",
 *   data: { productId: 1, productLogo: "...", productName: "...", price: 10, stock: 5, ... }
 * }
 */

const fields = [
    { id: "productId", label: msg`Product ID` },
    { id: "productLogo", label: msg`Product Logo` },
    { id: "price", label: msg`Price` },
    { id: "stock", label: msg`Stock` },
];

const Card = styled.section`
    padding: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.rowBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius};
`;

const Title = styled.h1`
    margin: 0 0 ${({ theme }) => theme.spacing.md};
    font-size: 1.5rem;
`;

const DetailsList = styled.dl`
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    margin: 0;

    dt {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.mutedText};
    }

    dd {
        margin: 0;
    }
`;

const Message = styled.p`
    color: ${({ theme }) => theme.colors.mutedText};
`;

function ProductDetails() {
    const { _ } = useLingui();
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ignore a late response if the user has already moved to another product
        let ignore = false;
        setLoading(true);
        get({}, `/v1/api/getProducts/${encodeURIComponent(productId)}`).then((response) => {
            if (ignore) return;
            setProduct(response.data?.data ?? null);
            setLoading(false);
        });
        return () => {
            ignore = true;
        };
    }, [productId]);

    return (
        <Page>
            <Toolbar>
                <LocaleSwitcher />
            </Toolbar>
            <p>
                <StyledLink to="/">← <Trans>Back to products</Trans></StyledLink>
            </p>
            <Card>
                {loading ? (
                    <Message><Trans>Loading…</Trans></Message>
                ) : !product ? (
                    <Message><Trans>Product not found</Trans></Message>
                ) : (
                    <>
                        <Title>{product.productName}</Title>
                        <DetailsList>
                            {fields.map((field) => (
                                <React.Fragment key={field.id}>
                                    <dt>{_(field.label)}</dt>
                                    <dd>{product[field.id]}</dd>
                                </React.Fragment>
                            ))}
                        </DetailsList>
                    </>
                )}
            </Card>
        </Page>
    );
}

export default ProductDetails;
