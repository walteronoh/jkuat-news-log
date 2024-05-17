import { useEffect, useState } from "react";
import NewsTitle from "./NewsTitle";
// import { fetchNews } from "../api/api";

const AsideTitle = ()=>{
const [news, setNews] = useState([]);

t
useEffect(
 ()=>{
    fetch("/data/content.json")
    .then((resp) => setNews(resp.json()));
}
 
,
[]
)

return(<>
<h2>Latest News</h2>
<div className="titles">
    {
    news.map((newsItem, i)=>{
        <NewsTitle key={i} title={newsItem.news_header} />
    })
}
</div>
</>)

}
export default AsideTitle