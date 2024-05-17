import { useEffect, useState } from "react";
// import { fetchNews } from "../api/api";

const AsideTitle = ()=>{
const [news, setNews] = useState([]);


useEffect(
 ()=>{
    fetch("/data/content.json")
    .then((resp) => setNews(resp));
}
 
,
[]
)

return(<>
<h2>Latest News</h2>
<div className="titles">
    {
    // news.map((newsItem, i)=>{
        // <NewsTitle key={i} title={newsItem.news_header} />
    // })
}
</div>
</>)

}
export default AsideTitle