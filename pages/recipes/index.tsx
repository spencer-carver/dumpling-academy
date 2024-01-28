import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "../../components/Link";
import { styled } from "../../styles/stitches";
import { API_URL } from "../../constants/ExternalUrls";
import { SECRET } from "../../constants/secret";
import fetchData from "../../utils/fetch";
import { PageProps } from "../../@types/global";
import { CSS } from "@stitches/react";

const TITLE = "All Recipes";
const DESCRIPTION = "Some of our favorite recipes for any time of day or year!";

export interface Recipe {
    name: string;
    description?: string;
    createdTime: number;
    modifiedTime: number;
    content?: string;
    author: string;
}

const ContentDiv = styled("div", {
    position: "relative",
    margin: "0 auto",
    padding: "0",
    maxWidth: "800px",
    textAlign: "left",
    "@lg": {
        padding: "30px 0 20px"
    }
});

const MenuDiv = styled("div", {
    padding: "20px 60px",
    minHeight: "calc(100vh - 196px)",
    backgroundColor: "$surface",
    color: "$onSurface",
    borderTop: "1px solid $onBackground",
    borderBottom: "1px solid $onBackground",
    "@lg": {
        border: "1px solid $onBackground",
        boxShadow: "5px 5px 5px $onBackground",
        padding: "20px 100px"
    }
});

const Heading = styled("h2", {
    textAlign: "center"
});

const linkStyles: CSS = {
    color: "$onSurface",
    textDecoration: "none",
    paddingBottom: "1px",
    borderBottom: "1px dotted $secondary",
    textTransform: "capitalize",
    "&:hover": {
        backgroundColor: "$secondary",
        color: "$onSecondary"
    }
};

function formatName(name: string): string {
    return name.replace(/-/g, " ");
}

const FilterTag = styled("div", {
    display: "inline-block",
    backgroundColor: "$surfaceAccent",
    padding: "5px",
    borderRadius: "5px",
    margin: "3px",
    textTransform: "capitalize",
    "&:hover": {
        backgroundColor: "$secondary",
        color: "$onSecondary",
        cursor: "pointer"
    }
});

const filterSelectedStyle: CSS = {
    backgroundColor: "$primary",
    color: "$onPrimary",
    "&:hover": {
        backgroundColor: "$primary",
        color: "$onPrimary",
        cursor: "pointer"
    }
};

const RecipeTags = styled("span", {
    display: "none",
    "@lg": {
        display: "initial"
    }
});

const ResetPrivateViewing = styled("span", {
    position: "absolute",
    float: "right",
    top: "15px",
    right: "10px",
    padding: "2px",
    border: "1px solid transparent",
    borderRadius: "5px",
    backgroundColor: "$primary",
    color: "$onPrimary",
    zIndex: "2",
    "&:hover": {
        cursor: "pointer"
    },
    "@lg": {
        top: "40px"
    }
});

const Recipes: FunctionComponent<PageProps> = ({ setLoading }) => {
    const [ recipes, setRecipes ] = useState([] as Recipe[]);
    const [ tags, setTags ] = useState<Record<string, number>>({});
    const [ filterTags, setFilterTags ] = useState<Record<string, boolean>>({});
    const [ secretRemaining, setSecretRemaining ] = useState<string>(SECRET);
    const [ canReadPrivateRecipes, setCanReadPrivateRecipes ] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetchData(`${ API_URL }/api/recipes`).then((data) => {
            const recipeList = (data as unknown as Recipe[]).sort((a, b) => a.name.localeCompare(b.name));

            let canReadPrivateRecipes = false;

            try {
                canReadPrivateRecipes = localStorage.getItem("canReadPrivateRecipes") === "true";
            } catch (error) {
                // do nothing
            }

            const filteredRecipes = [];
            const tags = {};

            recipeList.forEach((recipe) => {
                const { description } = recipe;
                const candidateTags = description.toLowerCase().split(",").map((tag) => tag.trim());

                candidateTags.forEach((candidate) => tags[candidate] = (tags[candidate] || 0) + 1);

                if (!candidateTags.includes("private") || canReadPrivateRecipes) {
                    filteredRecipes.push(recipe);
                }
            });

            setRecipes(filteredRecipes);
            setTags(tags);
            setLoading(false);
            setCanReadPrivateRecipes(canReadPrivateRecipes);
        });
    }, [setLoading]);

    const handleTagClick = useCallback((tag: string) => {
        if (filterTags[tag]) {
            delete filterTags[tag];
        } else {
            filterTags[tag] = true;
        }

        if (secretRemaining.length && Object.keys(tags).sort().filter((tag) => tag !== "private").indexOf(tag) === parseInt(secretRemaining[0]) - 1) {
            if (secretRemaining.length === 1) {
                try {
                    localStorage.setItem("canReadPrivateRecipes", "true");
                } catch (error) {
                    // do nothing
                }
                setCanReadPrivateRecipes(true);
            }

            setSecretRemaining((sr) => sr.substring(1));
        }
        
        setFilterTags({ ...filterTags });
    }, [secretRemaining, tags, filterTags]);

    const hideSecret = useCallback(() => {
        try {
            localStorage.removeItem("canReadPrivateRecipes");
        } catch (error) {
            // do nothing
        }
        setCanReadPrivateRecipes(false);
        setSecretRemaining(SECRET);
    }, []);

    return (
        <>
            <Head>
                <title>{ TITLE }</title>
                <link rel="canonical" href={ `${ process.env.NEXT_PUBLIC_SITE_URL }/recipes` } />
                <meta name="description" content={ DESCRIPTION } />
                <meta name="homepage" content="false" />
                <meta property="og:site_name" content={ TITLE } />
                <meta property="og:description" content={ DESCRIPTION } />
                <meta property="og:title" content={ TITLE } />
                <meta property="og:url" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/recipes` } />
                <meta property="og:image" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/seo.jpg` } />
                <meta name="twitter:description" content={ DESCRIPTION } />
                <meta name="twitter:title" content={ TITLE } />
                <meta name="twitter:image" content={ `${ process.env.NEXT_PUBLIC_SITE_URL }/seo.jpg` } />
            </Head>
            <ContentDiv>
                <MenuDiv>
                    <Heading>Recipes</Heading>
                    { canReadPrivateRecipes && <ResetPrivateViewing onClick={ hideSecret }>hide private</ResetPrivateViewing>}
                    <div style={{ paddingBottom: "15px" }}>
                        { Object.keys(tags).sort().filter((tag) => tag !== "private").map((tag, index) => (
                            <FilterTag key={ index } onClick={ () => handleTagClick(tag) } css={ filterTags[tag] ? filterSelectedStyle : {} }>
                                { tag } ({ tags[tag] })
                            </FilterTag>
                        )) }
                    </div>
                    { recipes.map((post, index) => {
                        let matchesFilter = true;

                        Object.keys(filterTags).map((tag) => {
                            matchesFilter = matchesFilter && post.description.toLowerCase().includes(tag);
                        });

                        if (!matchesFilter) {
                            return false;
                        }

                        return (
                            <div key={ index } style={{ paddingBottom: "5px", display: "flex", justifyContent: "space-between" }}>
                                <Link href={ `/recipes/${ post.name }` } css={ linkStyles }>{ formatName(post.name) }</Link>
                                <RecipeTags style={{ textAlign: "right" }}>{ post.description }</RecipeTags>
                            </div>
                        );
                    })}
                </MenuDiv>
            </ContentDiv>
        </>
    );
};

export default Recipes;
