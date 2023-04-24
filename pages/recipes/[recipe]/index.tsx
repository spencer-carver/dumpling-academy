import { useRouter } from "next/router";
import Head from "next/head";
import React, { FunctionComponent, Dispatch, SetStateAction, createContext, useContext, useEffect, useState, useCallback, MouseEventHandler } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HeadingComponent, SpecialComponents, TableDataCellComponent, TableHeaderCellComponent } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { PageProps } from "../../../@types/global";
import { API_URL } from "../../../constants/ExternalUrls";
import fetchData from "../../../utils/fetch";
import ErrorPage from "../../404";
import { styled } from "../../../styles/stitches";
import MarkdownComponents from "../../../components/Markdown";
import { Recipe } from "..";

function formatName(name: string): string {
    return name.replace(/-/g, " ");
}

const PageDiv = styled("div", {
    padding: "0 20px",
    position: "relative",
    backgroundColor: "$background",
    minHeight: "calc(100vh - 146px)",
    color: "$onBackground",
    "& sup span a": {
        borderBottom: "none"
    },
    "@lg": {
        margin: "20px auto",
        border: "1px solid $surface04",
        maxWidth: "690px",
        fontSize: "18px"
    },
    "@xxl": {
        margin: "20px auto",
        maxWidth: "1024px"
    }
});

const RecipeLink = styled("a", {
    color: "inherit",
    textDecoration: "none",
    borderBottom: "2px dotted $secondary",
    "&:visited":{
        color: "inherit"
    },
    "&:hover": {
        backgroundColor: "$secondary"
    }
});

const Table = styled("table", {
    borderCollapse: "collapse"
});

const TableHeading = styled("th", {
    display: "none",
    border: "1px solid transparent",
    padding: "2px"
});

const TableCell = styled("td", {
    border: "1px solid transparent",
    padding: "5px",
    "@lg": {
        "&:not(:last-of-type):not(:first-of-type)": {
            paddingRight: "15px"
        }
    }
});

const QuantityInput = styled("input", {
    width: "75px",
    border: "none",
    fontSize: "16px",
    fontFamily: "'Lato', sans-serif",
    color: "inherit",
    backgroundColor: "transparent",
    "&::-webkit-outer-spin-button": {
        appearance: "none"
    },
    "&::-webkit-inner-spin-button": {
        appearance: "none"
    },
    "&:hover": {
        cursor: "pointer"
    }
});

const SmartTableCell = ({ children }) => {
    const {
        scaleFactor,
        setScaleFactor,
        ingredientSet,
        setIngredientSet
    } = useRecipe();

    useEffect(() => {
        if (!children || !Number.isNaN(parseFloat(children[0]))) {
            return;
        }

        if (typeof children[0] !== "string") {
            if (children[0].props && children[0].props.children && children[0].props.children[0]) {
                ingredientSet.add(children[0].props.children[0].toLowerCase());

                setIngredientSet(ingredientSet);

                return;
            }
        }

        const value = children[0] as string;

        ingredientSet.add(value.toLowerCase());

        setIngredientSet(ingredientSet);
    }, [children, ingredientSet, setIngredientSet]);

    const onInputChange = useCallback((event) => {
        if (!children) {
            return;
        }

        const value = parseFloat(children[0] as string);

        if (Number.isNaN(value)) {
            return;
        }

        const newScaleFactor = (parseFloat(event.target.value) || 0) / value;

        setScaleFactor(newScaleFactor);
    }, [children, setScaleFactor]);

    if (!children || !children[0]) {
        return <TableCell>{ children }</TableCell>;
    }

    if (typeof children[0] !== "string") {
        if (children[0].props && children[0].props.children && children[0].props.children[0]) {
            return <TableCell data-ingredient={ children[0].props.children[0].toLowerCase() }>{ children[0] }</TableCell>;
        }
    }

    const value = children[0] as string;

    if (Number.isNaN(parseFloat(value))) {
        return <TableCell data-ingredient={ value.toLowerCase() }>{ value }</TableCell>;
    }

    const quantity = Math.round(scaleFactor * parseFloat(value) * 100) / 100;

    return (
        <TableCell>
            <QuantityInput type="number" step="any" min="0" value={ quantity } onChange={ onInputChange }/>
        </TableCell>
    );
};

const H4 = styled("h4", {});

const SmartH4 = ({ children }) => {
    const { ingredientSet, setIngredientSet } = useRecipe();

    useEffect(() => {
        if (!children || !children[0]) {
            return;
        }

        const ingredientList = children[0].includes(":") ? children[0].split(":")?.[1].trim() : "";

        ingredientList.split(",").forEach((v) => ingredientSet.add(v.trim().toLowerCase()));

        setIngredientSet(ingredientSet);
    }, [children, ingredientSet, setIngredientSet]);

    const [ heading, allIngredients ] = children[0].split(":");
    const ingredients = allIngredients.split(",").reduce((arr, ingredient) => {
        const parts = ingredient.split(" and ").map(i => i.trim()).filter(i => !!i);

        return arr.concat(parts);
    }, []);

    return (
        <H4>{ heading }: { ingredients.map((i, ind) =>
            <React.Fragment key={ ind }>
                { ind !== 0 && ind !== ingredients.length - 1 && ", " }
                { ingredients.length > 1 && ind === ingredients.length - 1 && " and " }
                <span data-ingredient={ i.trim().toLowerCase() } style={{ padding: "0 2px" }}>
                    { i.trim() }
                </span>
            </React.Fragment>
        ) }
        </H4>
    );
};

const Li = styled("li", {
    "&:hover": {
        backgroundColor: "$secondary",
        color: "$onSecondary",
        cursor: "pointer",
        "&::marker": {
            color: "$onBackground"
        }
    }
});

const SmartListItem = ({ index, children }) => {
    const [isDone, setIsDone] = useState(false);
    const { ingredientSet, onHoverStep, onLeaveStep } = useRecipe();

    if (!children || !children[0]) {
        return;
    }

    const instruction = children[0] as string;
    const ingredients = [];

    ingredientSet.forEach((ingredient) => {
        if (instruction.toLowerCase().includes(ingredient)) {
            ingredients.push(ingredient);
        }
    });

    return (
        <Li data-index={ index + 1 }
            onMouseEnter={ onHoverStep }
            onMouseLeave={ onLeaveStep }
            onClick={ () => setIsDone(v => !v) }
            css={ isDone ? { textDecoration: "line-through" } : {} }
        >
            { instruction }
        </Li>
    );
};

const IngredientMap = ({ children }) => {
    const { setMetadata } = useRecipe();

    useEffect(() => {
        try {
            const metadata = JSON.parse(children[0]);

            setMetadata(metadata);
        } catch (error) {
            // do nothing
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

const ResetScaleFactor = styled("span", {
    position: "absolute",
    float: "right",
    top: "10px",
    right: "20px",
    padding: "2px",
    border: "1px solid transparent",
    borderRadius: "5px",
    backgroundColor: "$secondary",
    color: "$onSecondary",
    zIndex: "2",
    "&:hover": {
        cursor: "pointer"
    }
});

interface StepMetadata {
    ingredients: string[];
}

interface RecipeProps {
    scaleFactor: number;
    setScaleFactor: Dispatch<SetStateAction<number>>;
    ingredientSet: Set<string>;
    setIngredientSet: Dispatch<SetStateAction<Set<string>>>;
    metadata: Record<number, StepMetadata>;
    setMetadata: Dispatch<SetStateAction<Record<number, StepMetadata>>>;
    onHoverStep: MouseEventHandler<HTMLLIElement>;
    onLeaveStep: MouseEventHandler<HTMLLIElement>;
}

const RecipeContext = createContext<RecipeProps>({
    scaleFactor: 1,
    setScaleFactor: () => {},
    ingredientSet: new Set<string>(),
    setIngredientSet: () => {},
    metadata: {},
    setMetadata: () => {},
    onHoverStep: () => {},
    onLeaveStep: () => {}
});

function useRecipe() {
    return useContext(RecipeContext);
}

const Recipe: FunctionComponent<PageProps> = ({ setLoading }) => {
    const router = useRouter();
    const { recipe: recipeName } = router.query;
    const [recipe, setRecipe] = useState({} as unknown as Recipe);
    const [loaded, setLoaded] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);
    const [ingredientSet, setIngredientSet] = useState(new Set<string>());
    const [metadata, setMetadata] = useState<Record<number, StepMetadata>>({});

    useEffect(() => {
        setLoading(true);
        if (!recipeName) {
            return;
        }

        fetchData(`${ API_URL }/api/recipes/${ recipeName }`).then((data) => {
            if (typeof (data as unknown as Recipe).content === "string") {
                setRecipe(data as unknown as Recipe);
            }
            setLoading(false);
            setLoaded(true);
        });
    }, [recipeName, setLoading]);

    const onHoverStep = useCallback((event) => {
        const stepNumber = parseInt(event.target.dataset.index);

        const ingredients = metadata[stepNumber]?.ingredients || [];

        const elements = ingredients.reduce((arr, ingredient) => {
            const ingredientElements = document.querySelectorAll(`[data-ingredient='${ ingredient.toLowerCase() }']`);

            return arr.concat(Array.from(ingredientElements));
        }, []);

        elements.forEach((element: HTMLTableCellElement | HTMLSpanElement) => {
            if (element.tagName === "TD") {
                element.parentElement.style.backgroundColor = "var(--colors-secondary)";
                element.parentElement.style.color = "var(--colors-onSecondary)";
            } else {
                element.style.backgroundColor = "var(--colors-secondary)";
                element.style.color = "var(--colors-onSecondary)";
            }
        });
    }, [metadata]);
    
    const onLeaveStep = useCallback((event) => {
        const stepNumber = parseInt(event.target.dataset.index);

        const ingredients = metadata[stepNumber]?.ingredients || [];

        const elements = ingredients.reduce((arr, ingredient) => {
            const ingredientElements = document.querySelectorAll(`[data-ingredient='${ ingredient.toLowerCase() }']`);

            return arr.concat(Array.from(ingredientElements));
        }, []);

        elements.forEach((element: HTMLTableCellElement | HTMLSpanElement) => {
            if (element.tagName === "TD") {
                element.parentElement.style.backgroundColor = "unset";
                element.parentElement.style.color = "unset";
            } else {
                element.style.backgroundColor = "unset";
                element.style.color = "unset";
            }
        });
    }, [metadata]);

    if (!loaded) {
        return null;
    }

    if (loaded && !recipe.content) {
        return <ErrorPage title="Recipe not found" statusCode={ 404 } />;
    }

    const publishDate = new Date(recipe.createdTime).toDateString();
    const modifyDate = new Date(recipe.modifiedTime).toDateString();

    const TITLE = formatName(recipe.name);
    const DESCRIPTION = `A recipe by ${ recipe.author }`;

    // eslint-disable-next-line react/no-children-prop
    return (
        <RecipeContext.Provider value={{ scaleFactor, setScaleFactor, ingredientSet, setIngredientSet, metadata, setMetadata, onHoverStep, onLeaveStep }}>
            <Head>
                <title>{ TITLE }</title>
                <link rel="canonical" href={ `${ process.env.NEXT_PUBLIC_SITE_URL }/recipes/${ recipeName }` } />
                <meta name="description" content={ DESCRIPTION } />
                <meta name="homepage" content="false" />
                <meta property="og:site_name" content={ TITLE } />
                <meta property="og:description" content={ DESCRIPTION } />
                <meta property="og:title" content={ TITLE } />
                <meta property="og:url" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/recipes/${ recipeName }` } />
                <meta property="og:image" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/seo.jpg` } />
                <meta name="twitter:description" content={ DESCRIPTION } />
                <meta name="twitter:title" content={ TITLE } />
                <meta name="twitter:image" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/seo.jpg` } />
            </Head>
            <PageDiv>
                <div>By { recipe.author }</div>
                { scaleFactor !== 1 && <ResetScaleFactor onClick={ () => setScaleFactor(1) }>reset</ResetScaleFactor>}
                <ReactMarkdown
                    remarkPlugins={ [remarkGfm] }
                    components={{
                        ...MarkdownComponents,
                        h4: SmartH4 as unknown as HeadingComponent,
                        table: Table as unknown as NormalComponents["table"],
                        th: TableHeading as unknown as TableHeaderCellComponent,
                        td: SmartTableCell as unknown as TableDataCellComponent,
                        li: SmartListItem as unknown as SpecialComponents["li"],
                        code: IngredientMap as unknown as NormalComponents["code"],
                        a: RecipeLink as unknown as NormalComponents["a"]
                    }}>
                    { recipe.content }
                </ReactMarkdown>
            </PageDiv>
        </RecipeContext.Provider>
    );
};

export default Recipe;
