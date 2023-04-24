import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "../../components/Link";
import { styled } from "../../styles/stitches";
import { API_URL } from "../../constants/ExternalUrls";
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
    margin: "0 auto",
    padding: "10px 0",
    maxWidth: "800px",
    minHeight: "calc(100vh - 146px)",
    textAlign: "left",
    "@lg": {
        paddingTop: "30px"
    }
});

const MenuDiv = styled("div", {
    padding: "20px 60px",
    minHeight: "400px",
    color: "black",
    "@lg": {
        minHeight: "600px",
        border: "1px solid $onBackground",
        boxShadow: "5px 5px 5px $onBackground",
        padding: "20px 100px",
        backgroundColor: "white",
    }
});

const Heading = styled("h2", {
    textAlign: "center"
});

const SectionHeading = styled("h2", {
    textAlign: "left",
    marginLeft: "-40px"
});

const linkStyles: CSS = {
    color: "$onSurface",
    textDecoration: "none",
    paddingBottom: "1px",
    borderBottom: "1px dotted $primary",
    textTransform: "capitalize"
};

function formatName(name: string): string {
    return name.replace(/-/g, " ");
}

const FilterTag = styled("div", {
    display: "inline-block",
    backgroundColor: "$surface",
    padding: "5px",
    borderRadius: "5px",
    margin: "3px",
    textTransform: "capitalize",
    "&:hover": {
        backgroundColor: "$surface",
        cursor: "pointer"
    }
});

const filterSelectedStyle: CSS = {
    backgroundColor: "$secondary",
    color: "$onSecondary",
    "&:hover": {
        backgroundColor: "$secondary",
        cursor: "pointer"
    }
};

const RecipeTags = styled("span", {
    display: "none",
    "@lg": {
        display: "initial"
    }
});

const Recipes: FunctionComponent<PageProps> = ({ setLoading }) => {
    const [ posts, setPosts ] = useState([] as Recipe[]);
    const [ tags, setTags ] = useState<Record<string, number>>({});
    const [ filterTags, setFilterTags ] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setLoading(true);
        fetchData(`${ API_URL }/api/recipes`).then((data) => {
            const postList = (data as unknown as Recipe[]).sort((a, b) => a.name.localeCompare(b.name));

            const tags = {};

            postList.forEach(({ description }) => {
                const candidateTags = description.toLowerCase().split(",");

                candidateTags.forEach((candidate) => tags[candidate.trim()] = (tags[candidate.trim()] || 0) + 1);
            });

            setPosts(postList);
            setTags(tags);
            setLoading(false);
        });
    }, [setLoading]);

    const handleTagClick = useCallback((tag: string) => {
        if (filterTags[tag]) {
            delete filterTags[tag];
        } else {
            filterTags[tag] = true;
        }
        
        setFilterTags({ ...filterTags });
    }, [filterTags]);

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
                    <SectionHeading>Dishes { posts.length > 0 && `(${ posts.length })` }</SectionHeading>
                    <div style={{ paddingBottom: "15px" }}>
                        { Object.keys(tags).sort().map((tag, index) => (
                            <FilterTag key={ index } onClick={ () => handleTagClick(tag) } css={ filterTags[tag] ? filterSelectedStyle : {} }>
                                { tag } ({ tags[tag] })
                            </FilterTag>
                        )) }
                    </div>
                    { posts.map((post, index) => {
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
