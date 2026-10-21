import React, {useState, useEffect, useMemo} from "react";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";
import { get } from "../state/apiService";
import Table from "../components/Table";
import LocaleSwitcher from "../components/LocaleSwitcher";
import { Page, Toolbar, StyledLink } from "../styles/Layout";

/*
 * Expected listing API response body:
 * {
 *   success: true,
 *   message: "Products fetched successfully",
 *   data: {
 *     items: [{ productId: 1, productLogo: "...", productName: "...", price: 10, stock: 5 }, ...],
 *     pagination: { page: 1, pageSize: 10, totalItems: 42, totalPages: 5 }
 *   }
 * }
 */

// labels are message descriptors, translated at render time for the active locale
const columns = [
    {
        id: "productId",
        label: msg`Product ID`,
    },
    {
        id: "productLogo",
        label: msg`Product Logo`,
    },
    {
        id: "productName",
        label: msg`Product Name`,
        render: (product) => (
            <StyledLink to={`/products/${product.productId}`}>{product.productName}</StyledLink>
        ),
    },
    {
        id: "price",
        label: msg`Price`,
    },
    {
        id: "stock",
        label: msg`Stock`,
    },
];
function ProductListing() {
    const { _ } = useLingui();
    const [listing, setListing] = useState({});
    const url = "/v1/api/getProducts";
    useEffect(() =>{
        get({}, url).then((response) => {
            // axios puts the body on response.data, the listing payload sits under body.data
            setListing(response.data?.data ?? {});
        });
    },[]);

    const products = useMemo(() => listing.items ?? [], [listing]);

    // _ changes identity when the locale switches, so the labels re-translate
    const translatedColumns = useMemo(
        () => columns.map((column) => ({ ...column, label: _(column.label) })),
        [_]
    );

    return (
        <Page>
            <Toolbar>
                <LocaleSwitcher />
            </Toolbar>
            <Table columns={translatedColumns} products={products} emptyMessage={_(msg`No products found`)} />
        </Page>
    );
}

export default ProductListing;
