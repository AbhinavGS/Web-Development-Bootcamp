import React from "react"
import ArticlesList from "../componets/ArticlesList";
import articleContent from "./article-content"

export default function ArticlesListPage() {
    return (
        <>
            <h1>Article</h1>
            <ArticlesList articles={articleContent} />
        </>
    );
}
